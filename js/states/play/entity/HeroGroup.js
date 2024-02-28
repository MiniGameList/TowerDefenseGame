import Phaser from "../../../libs/phaser";

export class HeroGroup extends Phaser.Group {
	constructor(scene, tower, enemyGroup) {
		super(scene);
		this.game = scene.game;
		this.tower = tower;
		this.enableBody = true;
		this.enemyGroup = enemyGroup;
		// 第一个
		this.createHero({
			x: scene.game.width / 3,
			// 子弹速度
			bulletVelocity: 200,
			// 子弹准备速度
			readySpeed: 1.5,
		});
		// 第二个
		this.createHero({
			x: scene.game.width / 3 * 2,
			bulletVelocity: 300,
			readySpeed: 2
		});
		// 子弹
		this.bulletGroup = this.game.add.group();
		this.bulletGroup.enableBody = true;
		
		// 爆炸
		this.explosionGroup = this.game.add.group();
		this.explosionGroup.enableBody = true;
	}
	createHero(options) {
		const hero = this.create(options.x, this.game.height - 50, 'hero');
		hero.anchor.setTo(0.5, 0.5);
		hero.scale.setTo(0.5, 0.5);
		hero.inputEnabled = true;
		// 发射子弹
		hero.bulletTimer = this.game.time.events.loop(Phaser.Timer.SECOND * options.readySpeed, () => {
			this.shoot(hero, options);
		});
	}
	
	shoot(hero, options) {
		
		let closestEnemy;
		let closestDistance = Infinity;
		this.enemyGroup.forEachAlive((enemy) => {
			// 在这里，enemy 是 group 中的每一个敌人
			let distance = Phaser.Math.distance(this.tower.x, this.tower.y, enemy.x, enemy.y);
			
			if (distance < closestDistance && enemy.shootable) {
				enemy.shootable = false;
				closestDistance = distance;
				closestEnemy = enemy;
			}
		});
		
		if (closestEnemy) {
			
			let bullet = this.bulletGroup.getFirstExists(false);
			if(bullet) {
				bullet.reset(hero.x, hero.y);
			} else {
				bullet = this.bulletGroup.create(hero.x, hero.y, 'bullet');
				bullet.outOfBoundsKill = true;
				bullet.checkWorldBounds = true;
				bullet.anchor.setTo(0.5, 0.5);
				bullet.scale.setTo(0.4, 0.4);
			}
			// 计算子弹的目标位置
			let targetX = closestEnemy.x - hero.x;
			let targetY = closestEnemy.y - hero.y;
			
			// 计算子弹的角度
			let angle = Math.atan2(targetY, targetX);
			
			// 设置子弹的速度
			bullet.body.velocity.x = Math.cos(angle) * options.bulletVelocity;
			bullet.body.velocity.y = Math.sin(angle) * options.bulletVelocity;
			// this.game.physics.arcade.moveToObject(bullet, closestEnemy, 300);
		}
		// this.soundBullet.play();
	}
}

