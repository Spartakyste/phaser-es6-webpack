import Phaser from 'phaser'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'SplashScene' })
  }

  preload () {
    //
    // load your assets
    //
  }

  create () {
    this.scene.start('MenuScene')
  }

  update () {}
}
