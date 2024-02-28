import Phaser from "../../../libs/phaser";

export class Tower extends Phaser.Sprite {
	constructor(scene) {
		super(scene, scene.game.width / 2, scene.game.height - 60, 'start');
		this.game = scene.game;
		scene.add.existing(this);
		this.anchor.setTo(0.5, 0.5);
		this.game.physics.arcade.enable(this);
		this.body.immovable = true;
	}
}
