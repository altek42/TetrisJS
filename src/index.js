import { Application } from 'pixi.js';
import './extensions/extensions';
import Tetris from './tetris/Tetris'
import Board from './presentation/Board';
import Player from './controller/Player';
import { BOARD_RENDER } from './Game.config';
import  pjson from '../package.json';

console.log("TETRIS", pjson.version);


class Program {
	constructor() {

		this.rootElement = document.getElementById('app');
		this.game = new Tetris({
			onGameOver: this.gameOver
		});

		this.app = new Application({
			width: BOARD_RENDER.width + BOARD_RENDER.margin,
			height: BOARD_RENDER.height + BOARD_RENDER.margin,
		});
		this.rootElement.appendChild(this.app.view)

		const halfMargin = BOARD_RENDER.margin / 2;
		this.board = new Board(this.app, {
			x: halfMargin,
			y: halfMargin
		})
		this.player = new Player(this.game, this.update)

		this.update()
	}

	update = (delta) => {
		this.app.stage.removeChildren()
		this.board.draw(this.game.view)
	}

	gameOver = () => {
		this.player.release();
	}

}

new Program();