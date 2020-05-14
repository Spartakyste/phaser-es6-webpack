import Phaser from 'phaser';
import WebFont from 'webfontloader';
import axios from 'axios';
import configuration from '../../configuration';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });

        this.serverError = null;

        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                console.log('error.config', error.config);
                if (!error.status) {
                    this.serverError = true;

                    setTimeout(() => axios.request(error.config), 10000);
                }
                // return Promise.reject(error);
            },
        );
    }

    async preload() {
        const result = await axios.get(`${configuration.BE_URL}/levels`);
        if (result) {
            console.log('result', result);
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
    }

    update() {
        console.log('this.serverError', this.serverError);
        if (this.serverError) this.scene.start('ErrorScene');
        else if (this.fontsReady) {
            this.scene.start('SplashScene');
        }
    }

    fontsLoaded() {
        this.fontsReady = true;
    }
}
