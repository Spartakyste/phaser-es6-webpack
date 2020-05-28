import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    init() {
        sessionStorage.setItem('Test', 32);
    }

    preload() {
        this.load.image('sky', '../../assets/images/sky.jpg');
    }

    create() {
        this.add.image(0, 0, 'sky');

        const newGameButton = this.add.text(100, 100, 'New Game', {
            font: '32px Bangers',
            fill: '#7744ff',
        });

        const loadGameButton = this.add.text(100, 200, 'Load Game ', {
            font: '32px Bangers',
            fill: '#7744ff',
        });

        const settingsButton = this.add.text(100, 300, 'Settings', {
            font: '32px Bangers',
            fill: '#7744ff',
        });

        newGameButton.setInteractive().on('pointerdown', () => this.scene.start('CreateUser'));

        loadGameButton.setInteractive().on('pointerdown', () => this.scene.start('Connect'));

        settingsButton.setInteractive().on('pointerdown', () => console.log('object'));
    }
}
