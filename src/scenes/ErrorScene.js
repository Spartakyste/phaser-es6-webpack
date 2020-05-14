import Phaser from 'phaser';

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'ErrorScene' });
    }

    preload() {
        this.load.image('sky', '../../assets/images/sky.jpg');
    }

    update() {
        this.add.image(0, 0, 'sky');

        this.add.text(20, 300, 'Please wait while we\'re trying to reconnect to the server ...', { color: 'red' });
    }
}
