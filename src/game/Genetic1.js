import Gen1 from "../controller/Gen1";
import Tetris from "../tetris/Tetris";
import { Application } from "pixi.js";
import Board from "../presentation/Board";
import { BOARD_RENDER } from "../Game.config";

class Genetic1 {
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
		
		this.player = new Gen1(this.game, this.update)
		this.player.run()

		this.update()
	}

	update = () => {
		this.app.stage.removeChildren()
		this.board.draw(this.game.view, this.game.score)
	}

	gameOver = () => {
		console.log('game over');
		this.player.onGameOver()
	}
}

export default Genetic1
