import Phaser from "../../../libs/phaser";

export class HeroGroup extends Phaser.Group {
	constructor(scene, tower, enemyGroup) {
		super(scene);
		this.game = scene.game;
		this.tower = tower;
		this.enableBody = true;
		this.enemyGroup = enemyGroup;
		const hero = this.create(scene.game.width / 3, scene.game.height - 50, 'enemy');
		hero.anchor.setTo(0.5, 0.5);
		hero.scale.setTo(0.5, 0.5);
		hero.inputEnabled = true;
		// 发射子弹
		hero.bulletTimer = this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, () => {
			this.shoot(hero);
		});
		
		// 子弹
		this.bulletGroup = this.game.add.group();
		this.bulletGroup.enableBody = true;
		
		// 爆炸
		this.explosionGroup = this.game.add.group();
		this.explosionGroup.enableBody = true;
	}
	
	shoot(hero) {
		var bullet = this.bulletGroup.getFirstExists(false);
		if(bullet) {
			bullet.reset(hero.x, hero.y);
			// bullet.body.velocity.y = -600;
		} else {
			bullet = this.bulletGroup.create(hero.x, hero.y, 'bullet');
			bullet.outOfBoundsKill = true;
			bullet.checkWorldBounds = true;
			bullet.anchor.setTo(0.5, 0.5);
			bullet.scale.setTo(0.4, 0.4);
			// bullet.body.velocity.y = -600;
		}
		var closestEnemy;
		var closestDistance = Infinity;
		this.enemyGroup.forEachAlive((enemy) => {
			// 在这里，enemy 是 group 中的每一个敌人
			var distance = Phaser.Math.distance(this.tower.x, this.tower.y, enemy.x, enemy.y);
			
			if (distance < closestDistance) {
				closestDistance = distance;
				closestEnemy = enemy;
			}
		});
		
		if (closestEnemy) {
			
			// 计算子弹的目标位置
			var targetX = closestEnemy.x - hero.x;
			var targetY = closestEnemy.y - hero.y;
			
			// 计算子弹的角度
			var angle = Math.atan2(targetY, targetX);
			
			// 设置子弹的速度
			bullet.body.velocity.x = Math.cos(angle) * 300;
			bullet.body.velocity.y = Math.sin(angle) * 300;
			// this.game.physics.arcade.moveToObject(bullet, closestEnemy, 300);
		}
		// this.soundBullet.play();
	}
}

