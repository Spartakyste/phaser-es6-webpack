/* globals __DEV__ */
import Phaser from 'phaser'
import axios from 'axios';

import configuration from '../../../configuration';

export default class CreateUser extends Phaser.Scene {
    constructor() {
        super({ key: 'CreateUser' });

        this.inputValue = '';
    }

    postUser = () => axios.post(configuration.BE_URL + "/user", { user: { username: 'Test' } });

    init() {

    }

    preload() {

    }

    create() {

        this.add.image(0, 0, 'sky');

        const rectangle = this.add.rectangle(400, 300, 600, 300, 0xffffff, 1);

        const interactiveContainer = this.add.rectangle(400, 300, 400, 50, 0xACACAC, 1).setInteractive();


        interactiveContainer.on("pointerdown", (event) => {
            const input = this.add.rectangle(400, 300, 300, 25, 0xDDDDDD, 1).setInteractive();
            const inputText = this.add.text(300, 290, this.inputValue);

            this.input.keyboard.on('keydown', (event) => {
                if ((event.key === 'Backspace') && (this.input.value.length >= 1)) {
                    this.inputValue = this.inputValue.slice(0, -1)
                } else {
                    if (event.key.length > 1) return;
                    this.inputValue = this.inputValue + event.key;
                }
                inputText.setText(this.inputValue);
            });
        })


    }

}
