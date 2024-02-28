import Phaser from '../libs/phaser.js'
import PreLoadState from "./preLoadState.js";

export default class BootState extends Phaser.State {
  init(){
    console.log("boot");
  }
  preload() {
    var game = this.game;
    game.stage.backgroundColor='#ffffff';
    //this.game.load.BaseURL="";
    game.load.image('notice', 'assets/images/notice.png');
    game.load.image('loading', 'assets/images/loading.jpg');
  }
  create() {
    var game = this.game;
    let {windowWidth,windowHeight}=wx.getSystemInfoSync();
    let noticeImg = game.add.image(0,-100, 'notice');
    let noticeScale=windowWidth*0.999/noticeImg.width;
    noticeImg.scale.set(noticeScale,noticeScale);
    setTimeout(()=> {
      this.game.state.start("PreLoadState");
    }, [1000])

  }
  // update() {
  // }
}

