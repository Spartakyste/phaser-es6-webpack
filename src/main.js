import Phaser from 'phaser';

import BootScene from './scenes/Boot';
import SplashScene from './scenes/Splash';
import MenuScene from './scenes/MenuScene';
import CreateUser from './scenes/user/CreateUser';
import ErrorScene from './scenes/ErrorScene';

import config from './config';
import StarterScene from './scenes/game/StarterScene';
import Connect from './scenes/user/Connect';

const gameConfig = Object.assign(config, {
    scene: [MenuScene, BootScene, SplashScene, CreateUser, Connect, StarterScene, ErrorScene],
});

class Game extends Phaser.Game {
    constructor() {
        super(gameConfig);
    }
}

window.game = new Game();
