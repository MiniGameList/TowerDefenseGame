import Phaser from '../../libs/phaser.js'
import {EnemyGroup} from "./entity/EnemyGroup";
import {Tower} from "./entity/Tower";
import {Background} from "./entity/Background";
import {HeroGroup} from "./entity/HeroGroup";

export default class PLayState extends Phaser.State {
	constructor(game) {
		super();
		this.game = game;
	}
	preload() {

	}
	create() {
		this.bg = new Background(this);
		// 城堡
		this.tower = new Tower(this);
		// 敌机
		this.enemyGroup = new EnemyGroup(this);
		// 英雄
		this.heroGroup = new HeroGroup(this, this.tower, this.enemyGroup);
		//
		// // 声音，如果要用循环，需要给定totalDuration的值，音频长度
		// this.soundBgm = this.game.add.audio('bgm', 1, {loop: true, totalDuration: 62});
		// this.soundBgm.play();
		// this.soundBullet = this.game.add.audio('bullet');
		// this.soundBoom = this.game.add.audio('boom');
	}

	update() {
		this.game.physics.arcade.collide(this.tower, this.enemyGroup, this.blow, null, this);
		this.game.physics.arcade.overlap(this.enemyGroup, this.heroGroup.bulletGroup, this.hit, null, this);
		
	}
	render() {
	}

	blow(tower, enemy) {
		// this.stopAll();
		// this.gameOver();
		enemy.body.velocity.x = 0;
    	enemy.body.velocity.y = 0;
	}

	hit(enemy, bullet) {
		enemy.kill();
		bullet.kill();
		// 加分
		// this.score++;
		// this.scoreText.text = this.score + '';
		var explosion = this.heroGroup.explosionGroup.getFirstExists(false);
		if(!explosion) {
			explosion = this.heroGroup.explosionGroup.create(enemy.x, enemy.y, 'explosion');
			explosion.anchor.setTo(0.5, 0.5);
		} else {
			explosion.reset(enemy.x, enemy.y);
		}
		var anim = explosion.animations.add('explosion');
		anim.play('explosion', 20);
		anim.onComplete.add(function() {
			explosion.kill();
		}, this);
		// this.soundBoom.play();
	}
	// stopAll() {
	// 	this.enemyGroup.setAll('body.velocity.y', 0);
	// 	this.bulletGroup.setAll('body.velocity.y', 0);
	// 	// this.game.time.events.remove(this.enemyTimer);
	// 	this.game.time.events.remove(this.bulletTimer);
	// 	this.bg.stopScroll();
	// 	this.hero.input.disableDrag();
	// 	this.soundBgm.stop();
	// }
	// gameOver() {
	// 	var dialog = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'common', 'dialog');
	// 	dialog.anchor.setTo(0.5, 0.5);
	// 	dialog.scale.setTo(2.5, 2.5);
	// 	// 文字
	// 	var style = {font: "16px", fill: "#ffffff"};
	// 	// 游戏结束
	// 	var gameOverText = this.game.add.text(2, -35, '游戏结束', style);
	// 	gameOverText.anchor.setTo(0.5, 0.5);
	// 	gameOverText.scale.setTo(0.7, 0.7);
	// 	dialog.addChild(gameOverText);
	// 	var gameOverScoreText = this.game.add.text(0, -8, '得分: ' + this.score, style);
	// 	gameOverScoreText.anchor.setTo(0.5, 0.5);
	// 	gameOverScoreText.scale.setTo(0.6, 0.6);
	// 	dialog.addChild(gameOverScoreText);
	// 	var restartButton = this.game.add.sprite(0, 16, 'common', 'button');
	// 	restartButton.anchor.setTo(0.5, 0.5);
	// 	restartButton.scale.setTo(1.2, 0.7);
	// 	dialog.addChild(restartButton);
	// 	var restartText = this.game.add.text(0, 2, '返回', style);
	// 	restartText.anchor.setTo(0.5, 0.5);
	// 	restartText.scale.setTo(0.55/1.2, 0.55/0.7);
	// 	restartButton.addChild(restartText);
	// 	restartButton.inputEnabled = true;
	// 	restartButton.events.onInputDown.add(this.restart, this);
	// }

	// restart() {
	// 	this.game.state.start('LoginState');
	// }

}


