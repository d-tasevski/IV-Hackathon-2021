import Phaser from 'phaser';

import Player from '../../gameObjects/Player';
import Debugger from '../../gameObjects/Debugger';
import Goomba from '../../gameObjects/Goomba';
import Coin from '../../gameObjects/Coin';
import Flag from '../../gameObjects/Flag';

import tiles from '../../config/tiles';
import generateAnimations from '../../config/animations';
import increaseLevel from '../../ui/increaseLevel';

class LevelTwo extends Phaser.Scene {
	constructor() {
		super('LevelTwo');
	}

	// Tileset by https://www.deviantart.com/thecrushedjoycon/art/Super-Mario-Bros-Mega-Tileset-Ver-2-842092790
	// Goombas are from https://mfgg.net/index.php?act=resdb&param=02&c=1&id=4200
	// Mario from https://www.mariomayhem.com/downloads/sprites/super_mario_bros_sprites.php
	// Atlas generated by https://gammafp.github.io/atlas-packer-phaser/editor
	preload() {
		this.load.image('tiles', './assets/tiles.png');
		this.load.tilemapTiledJSON('map', './assets/map.json');
		this.load.atlas('atlas', './assets/mario-atlas.png', './assets/mario-atlas.json');

		this.load.on('complete', () => {
			generateAnimations(this);
		});
	}

	create() {
		const noCollisionTiles = [tiles.EMPTY, tiles.FLAG_LEFT];

		this.map = this.make.tilemap({ key: 'map' });
		this.tileset = this.map.addTilesetImage('map-tileset', 'tiles');
		this.platform = this.map.createLayer('platform', this.tileset, 0, 0);

		this.map.createLayer('background', this.tileset, 0, 0);
		this.platform.setCollisionByExclusion(noCollisionTiles, true);

		this.player = new Player(this, 25, 400).collideWith(this.platform);
		this.goombas = new Goomba(this).collideWith(this.platform);
		this.coins = new Coin(this).collideWith(this.player.sprite);
		this.flag = new Flag(this);
		this.debugger = new Debugger(this);

		this.inputs = this.input.keyboard.createCursorKeys();
	}

	update() {
		this.player.update(this.inputs);
		this.goombas.update();
		this.coins.update();
		this.debugger.debuggerEnabled && this.debugger.update();
	}

	onLevelEnd() {
		increaseLevel();
		this.scene.start('LevelThree');
	}
}

export default LevelTwo;
