import Phaser from 'phaser'

import BootScene from './scenes/Boot'
import SplashScene from './scenes/Splash'
import MenuScene from './scenes/MenuScene'
import CreateUser from './scenes/user/CreateUser'

import config from './config'
import StarterScene from './scenes/game/StarterScene'

const gameConfig = Object.assign(config, {
  scene: [BootScene, SplashScene, MenuScene, CreateUser, StarterScene ]
})

class Game extends Phaser.Game {
  constructor () {
    super(gameConfig)
  }
}

window.game = new Game()
