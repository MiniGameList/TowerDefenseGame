import Phaser from '../libs/phaser.js'
import {Button} from '../components/Button.js'

export default class LoginState extends Phaser.State {
  init(props){
    console.log("login123");
  }
  preload() {
  }
  create() {
    let game = this.game;
    let loginImg = game.add.image(0,-100, 'login');
    let loginScale=game.width*0.999/loginImg.width;
    loginImg.scale.set(loginScale,loginScale);

    // 登录Button
    let startImg = game.add.image(game.width/2,game.height/1.2, 'start');
    startImg.anchor.setTo(0.5,0.5);
    startImg.scale.set(0.9);

    Button(startImg, () => {
      console.log("进入游戏");
      this.game.state.start('PlayState');
    });
  }
  update() {
  }
}
