import Phaser from 'phaser';
import WebFont from 'webfontloader';
import axios from 'axios';
import configuration from '../../configuration';

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    async preload() {
        const result = await axios.get(`${configuration.BE_URL}/levels`);
        this.cache.custom.levels = result.data.levels;

        this.fontsReady = false;
        this.fontsLoaded = this.fontsLoaded.bind(this);
        this.add.text(100, 100, 'loading fonts...');

        this.load.image('loaderBg', './assets/images/loader-bg.png');
        this.load.image('loaderBar', './assets/images/loader-bar.png');

        WebFont.load({
            google: {
                families: ['Bangers'],
            },
            active: this.fontsLoaded,
        });
    }

    update() {
        if (this.fontsReady) {
            this.scene.start('SplashScene');
        }
    }

    fontsLoaded() {
        this.fontsReady = true;
    }
}
