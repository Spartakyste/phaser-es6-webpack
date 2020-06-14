import Phaser from 'phaser';
import axios from 'axios';

import configuration from '../../../configuration';


export default class Connect extends Phaser.Scene {
    constructor() {
        super({ key: 'Connect' });

        this.username = '';
        this.password = '';
        this.usernameClicked = false;
        this.passwordClicked = false;

        this.authFailed = false;

        this.userFocus = null;

        this.postUser = async (callback) => {
            const resultAuth = await axios.post(`${configuration.BE_URL}/auth`, { username: this.username, password: this.password });

            if (!resultAuth) {
                this.authFailed = true;
                return;
            }

            const token = resultAuth.data.access_token;
            this.cache.custom.user = resultAuth.data.user;

            localStorage.setItem('access_token', token);

            callback();
        };
    }


    // init() {

    // }

    // preload() {

    // }

    create() {
        this.add.image(0, 0, 'sky');

        const backButton = this.add.text(0, 0, 'Go back', { fontFamily: 'Arial', fontSize: 20, color: '#000000' }).setInteractive();

        backButton.on('pointerdown', () => this.scene.start('MenuScene'));


        const usernameContainer = this.add.rectangle(400, 300, 400, 50, 0xffffff, 1).setInteractive();

        const passwordContainer = this.add.rectangle(400, 400, 400, 50, 0xffffff, 1).setInteractive();


        usernameContainer.on('pointerdown', () => {
            this.input.keyboard.removeListener('keydown');
            if (this.usernameClicked) return;
            this.usernameClicked = true;
            this.passwordClicked = false;

            const usernameText = this.add.text(300, 290, this.username, { color: 'Black' });

            this.input.keyboard.on('keydown', (event) => {
                if ((event.key === 'Backspace') && (this.username.length >= 1)) {
                    this.username = this.username.slice(0, -1);
                } else {
                    if (event.key.length > 1) return;
                    this.username += event.key;
                }
                usernameText.setText(this.username);
            });
        });

        passwordContainer.on('pointerdown', () => {
            this.input.keyboard.removeListener('keydown');
            if (this.passwordClicked) return;
            this.passwordClicked = true;
            this.usernameClicked = false;

            const passwordText = this.add.text(300, 390, this.password, { color: 'Black' });

            const button = this.add.rectangle(500, 500, 100, 25, 0xDDDDDD, 1).setInteractive();
            this.add.text(470, 490, 'Envoyer');

            button.on('pointerdown', () => this.postUser(() => this.scene.start('StarterScene')));

            this.input.keyboard.on('keydown', (event) => {
                if ((event.key === 'Backspace') && (this.password.length >= 1)) {
                    this.password = this.password.slice(0, -1);
                } else {
                    if (event.key.length > 1) return;
                    this.password += event.key;
                }
                passwordText.setText(this.password);
            });
        });
    }

    update() {
        if (this.authFailed) {
            this.add.text(400, 200, 'Wrong credentials', { color: 'Red' });
        }
    }
}
