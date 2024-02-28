import Phaser from '../../../libs/phaser'
export class EnemyGroup extends Phaser.Group {
	constructor(scene) {
		super(scene);
		this.game = scene.game;
		this.enableBody = true;
		let time = 0;
		// 生成敌机
		this.enemyTimer = this.game.time.events.loop(Phaser.Timer.SECOND * 1, () => {
			time++;
			if (time > 10) {
				this.game.time.events.remove(this.enemyTimer);
			}
			this.generateOneEnemy();
		});
	}
	
	update() {
		this.game.physics.arcade.collide(this, this);
	}
	
	
	randomEnemyX() {
		var halfW = 120 * 0.3;
		return this.game.rnd.integerInRange(halfW, this.game.width - halfW);
	}
	generateOneEnemy() {
		var enemy = this.getFirstExists(false);
		let enemyX = this.randomEnemyX();
		if(enemy) {
			enemy.reset(enemyX, 79 * 0.5);
		} else {
			enemy = this.create(enemyX, 79 * 0.5, 'enemy');
			enemy.outOfBoundsKill = true;
			enemy.checkWorldBounds = true;
			enemy.anchor.setTo(0.5, 0.5);
			enemy.scale.setTo(0.5, 0.5);
			
			// 设置敌人的血量
			enemy.health = 2;
			
			// 创建血条
			enemy.healthBar = this.game.add.graphics(0, 0);
			
			// 设置血条的位置
			enemy.healthBar.x = enemy.x;
			enemy.healthBar.y = enemy.y - 20;
			
			
			// 绘制血条
			enemy.healthBar.beginFill(0xFF0000);
			enemy.healthBar.drawRect(0, 0, 50, 5);
			enemy.healthBar.endFill();
			// 将血条添加到敌人
			enemy.addChild(enemy.healthBar);
		}
		
		enemy.shootable = true;
		enemy.body.velocity.y = 20;
		
	}
}
