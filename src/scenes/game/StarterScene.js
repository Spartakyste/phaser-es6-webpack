/* globals __DEV__ */
import Phaser from 'phaser'

export default class StarterScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StarterScene' });

        this.player;
        this.cursors;
    }


    init() {
        console.log('Init starter scene')
    }

    preload() {
        this.load.image('baseTiles', '../../../assets/tilesets/[Base]BaseChip_pipo.png');
        this.load.image('grassAndDirt', '../../../assets/tilesets/[A]Grass1-Dirt1_pipo.png');
        this.load.image('sea', '../../../assets/tilesets/[A]Water7_pipo.png');
        this.load.image('grass', '../../../assets/tilesets/[A]Grass2_pipo.png');
        this.load.image('character', '../../../assets/Character sprite.png');
        this.load.tilemapTiledJSON("map", "../../../assets/Game2..json");

        this.load.atlas("atlas", "../../../assets/atlas.png", "../../../assets/atlas.json");
    }

    create() {
        const map = this.make.tilemap({ key: "map" });

        

        const baseSet = map.addTilesetImage("[Base]BaseChip_pipo", "baseTiles");
        const grassAndDirt = map.addTilesetImage("[A]Grass1-Dirt1_pipo", "grassAndDirt");
        const grass = map.addTilesetImage("[A]Grass2_pipo", "grass");
        const sea = map.addTilesetImage("[A]Water7_pipo", "sea");

        const groundLayer = map.createStaticLayer("Ground", [baseSet, grassAndDirt], 0, 0);
        const seaLayer = map.createStaticLayer("Sea", sea, 0, 0);
        const grassLayer = map.createStaticLayer("Grass", grass, 0, 0);
        const worldLayer = map.createStaticLayer("Player level", baseSet, 0, 0);

        worldLayer.setCollisionByProperty({ collides: true });
        seaLayer.setCollisionByProperty({ collides: true })

        const spawnPoint = map.findObject("Spawn point", obj => obj.name === "Spawn point");
        this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-back");

        this.player.setScale(0.7, 0.6);
        this.player.setSize(this.player.width, this.player.body.height - 15);
        this.player.setOffset(0, 20);
        this.player.body.setCollideWorldBounds(true);
        this.physics.world.on('worldbounds', function(body){
            console.log('hello from the edge of the world', body);
        },this);

        this.physics.add.collider(this.player, worldLayer);
        this.physics.add.collider(this.player, seaLayer);



        this.cursors = this.input.keyboard.createCursorKeys();

        const anims = this.anims;

        anims.create({
            key: "misa-left-walk",
            frames: anims.generateFrameNames("atlas", {
                prefix: "misa-left-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        anims.create({
            key: "misa-right-walk",
            frames: anims.generateFrameNames("atlas", {
                prefix: "misa-right-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        anims.create({
            key: "misa-front-walk",
            frames: anims.generateFrameNames("atlas", {
                prefix: "misa-front-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        anims.create({
            key: "misa-back-walk",
            frames: anims.generateFrameNames("atlas", {
                prefix: "misa-back-walk.",
                start: 0,
                end: 3,
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    update(time, delta) {
        const speed = 100;
        const prevVelocity = this.player.body.velocity.clone();

        // Stop any previous movement from the last frame
        this.player.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that this.player can't move faster along a diagonal
        this.player.body.velocity.normalize().scale(speed);

        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown) {
            this.player.anims.play("misa-left-walk", true);
        } else if (this.cursors.right.isDown) {
            this.player.anims.play("misa-right-walk", true);
        } else if (this.cursors.up.isDown) {
            this.player.anims.play("misa-back-walk", true);
        } else if (this.cursors.down.isDown) {
            this.player.anims.play("misa-front-walk", true);
        } else {
            this.player.anims.stop();

            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.player.setTexture("atlas", "misa-left");
            else if (prevVelocity.x > 0) this.player.setTexture("atlas", "misa-right");
            else if (prevVelocity.y < 0) this.player.setTexture("atlas", "misa-back");
            else if (prevVelocity.y > 0) this.player.setTexture("atlas", "misa-front");
        }
    }

}
