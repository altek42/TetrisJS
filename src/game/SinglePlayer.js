import { Application } from 'pixi.js';
import Tetris from '../tetris/Tetris'
import Board from '../presentation/Board';
import Player from '../controller/Player';
import { BOARD_RENDER } from '../Game.config';

class SinglePlayer {
	constructor(rootElement) {
		this.rootElement = rootElement;
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

	update = () => {
		this.app.stage.removeChildren()
		this.board.draw(this.game.view)
	}

	gameOver = () => {
		this.player.release();
	}

}

export default SinglePlayer
