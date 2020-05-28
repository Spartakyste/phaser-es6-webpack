/* globals __DEV__ */
import Phaser from 'phaser';
import axios from 'axios';

import configuration from '../../../configuration';


export default class CreateUser extends Phaser.Scene {
    constructor() {
        super({ key: 'CreateUser' });

        this.inputValue = '';
        this.alreadyClicked = false;

        this.postUser = async (callback) => {
            await axios.post(`${configuration.BE_URL}/user`, { user: { username: this.inputValue } });
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


        const interactiveContainer = this.add.rectangle(400, 300, 400, 50, 0xffffff, 1).setInteractive();


        interactiveContainer.on('pointerdown', () => {
            if (this.alreadyClicked) return;
            this.alreadyClicked = true;

            const inputText = this.add.text(300, 290, this.inputValue, { color: 'Black' });

            const button = this.add.rectangle(500, 400, 100, 25, 0xDDDDDD, 1).setInteractive();
            const buttonText = this.add.text(470, 390, 'Envoyer');

            button.on('pointerdown', () => this.postUser(() => this.scene.start('StarterScene')));

            this.input.keyboard.on('keydown', (event) => {
                if ((event.key === 'Backspace') && (this.inputValue.length >= 1)) {
                    this.inputValue = this.inputValue.slice(0, -1);
                } else {
                    if (event.key.length > 1) return;
                    this.inputValue += event.key;
                }
                inputText.setText(this.inputValue);
            });
        });
    }
}
