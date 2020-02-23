/* globals __DEV__ */
import Phaser from 'phaser'
import axios from 'axios';

import configuration from '../../../configuration';

export default class CreateUser extends Phaser.Scene {
    constructor() {
        super({ key: 'CreateUser' })
    }

    postUser = () => axios.post(configuration.BE_URL + "/user", { user: { username: 'Test' } });

    init() {

    }

    preload() {

    }

    create() {


    }
}
