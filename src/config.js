import Phaser from 'phaser'

export default {
  type: Phaser.AUTO,
  parent: 'content',
  width: 640,
  height:640,
  localStorageName: 'phaseres6webpack',
  physics: {
    default: "arcade",
    arcade: {
      debug : true,
      gravity: { y: 0 }
    }
  }
}
