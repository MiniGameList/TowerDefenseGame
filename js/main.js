import Phaser from './libs/phaser'
import BootState from './states/bootState'
import LoginState from './states/loginState'
import PreLoadState from './states/preLoadState'
import PlayState from './states/play/PlayState'
import Play2State from './states/play/Play2State'

class Game extends Phaser.Game {
  constructor() {
    let { windowWidth, windowHeight } = wx.getSystemInfoSync()
    const conf = {
      width: windowWidth,
      height: windowHeight,
      canvas: canvas,
      renderer: Phaser.WEBGL,
      transparent: false,
      antialias: false,
    };
    super(conf)
    this.state.add('BootState', BootState)
    this.state.add('PreLoadState', PreLoadState)
    this.state.add('LoginState', LoginState)
    this.state.add('PlayState', PlayState)
    this.state.add('Play2State', Play2State)
    this.state.start('BootState')
  }
}
new Game()
