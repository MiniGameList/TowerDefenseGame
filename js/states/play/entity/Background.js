export class Background extends Phaser.TileSprite {
	constructor(scene) {
		super(scene, 0, 0, scene.game.width, scene.game.height, 'bg');
		this.game = scene.game;
		scene.add.existing(this);
	}
}
