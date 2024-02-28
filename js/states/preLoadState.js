import Phaser from '../libs/phaser.js'
import Common from '../atlas/common.js'

export default class PreLoadState extends Phaser.State {

  init(props){
    console.log("PreLoadState");
  }
  preload() {
		// 开启物理引擎
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
        var game = this.game;
      //this.game.load.BaseURL="";
      game.load.image('login', 'assets/images/login.jpg');
      game.load.image('start','assets/images/start1.png');
      game.load.image('age','assets/images/age.png');
      game.load.image('warn','assets/images/warn.png');
      game.load.image('bg', 'assets/images/bg.png');
      game.load.image('hero', 'assets/images/hero.png');
      game.load.image('enemy', 'assets/images/enemy.png');
      game.load.spritesheet('explosion', 'assets/images/explosion.png', 47, 64, 19);
      game.load.image('bullet', 'assets/images/bullet.png');
      game.load.atlas('common', 'assets/images/common.png', null, Common);
      game.load.audio('bgm', 'assets/audio/bgm.mp3');
      game.load.audio('boom', 'assets/audio/boom.mp3');
      game.load.audio('bullet', 'assets/audio/bullet.mp3');
/*      this.game.load.onFileComplete.add((progress)=>{
         if(progress===100){
             this.game.state.start("LoginState");
         }
      },this);*/
 /*
    // 设置并发下载数
    this.game.load.maxParallelDownloads=1;
    // 输出加载失败的文件
    this.game.load.onFileError.add((key,url)=>{
      console.log("err--onFileError--"+key+"--"+JSON.stringify(file))
    },this);
    this.game.load.onFileComplete.add((progress,key,success,totalload,total)=>{
      console.log("err--onFileComplete--"+progress+"--"+key+"--"+sucess+"--"+totalload+"--"+total)
    },this);
 */
  }
  create() {
      var game = this.game;
      let loadingImg = game.add.image(0,0, 'loading');
      setTimeout(()=> {
          this.game.state.start("LoginState");
      }, [2000])
  }
   update() {

   }
}


