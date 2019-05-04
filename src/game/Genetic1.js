import Gen1 from "../controller/Gen1";
import Tetris from "../tetris/Tetris";
import { Application } from "pixi.js";
import Board from "../presentation/Board";
import { BOARD_RENDER, GENETIC_1 } from "../Game.config";
import Population from "../controller/utils/Population";
import Genetic1Log from "../presentation/Genetic1Log";

class Genetic1 {
	constructor(rootElement) {
		this.rootElement = document.createElement('div');
		rootElement.appendChild(this.rootElement)

		//create games
		this.games = new Array(GENETIC_1.population).fill(0).map((x, i) => {
			return new Tetris({
				onGameOver: this.gameOver(i)
			});
		})

		//create scene
		const singleWidth = BOARD_RENDER.width + BOARD_RENDER.margin
		const singleHeight = BOARD_RENDER.height + BOARD_RENDER.margin
		const columns = Math.ceil(GENETIC_1.population / GENETIC_1.rowCount)

		const totalWidth = (BOARD_RENDER.width + BOARD_RENDER.margin) * columns
		this.app = new Application({
			width: totalWidth,
			height: (BOARD_RENDER.height + BOARD_RENDER.margin) * GENETIC_1.rowCount,
		});
		this.app.view.className = 'game-canvas'
		this.rootElement.appendChild(this.app.view)

		//create boards
		const halfMargin = BOARD_RENDER.margin / 2;
		this.boards = []
		for (let i = 0; i < GENETIC_1.population; i++) {
			const x = Math.floor(i / GENETIC_1.rowCount)
			const y = i % GENETIC_1.rowCount;

			this.boards.push(
				new Board(this.app, {
					x: halfMargin + (singleWidth * x),
					y: halfMargin + (singleHeight * y)
				})
			)
		}

		//create controllers
		this.players = new Array(GENETIC_1.population).fill(0).map((x, i) => {
			return new Gen1(this.games[i])
		})

		//
		this._pause = false;
		this.start()

		//
		this.label = document.createElement('p');
		this.rootElement.appendChild(this.label)
		this.label.className = 'gen-text'
		this.genText = 0
		//
		this.logger = new Genetic1Log(this.rootElement)
	}

	handlePause = () => {

	}

	start(interval = 200) {
		if(this._pause) return;
		this.runAll()
		this.loop = setInterval(() => {
			this.update()
		}, interval);
	}

	set genText(arg) {
		this._gen = arg
		this.label.innerText = `Gen: ${arg}`
	}

	runAll = async () => {
		this.runningGames = GENETIC_1.population;
		for (let i = 0; i < GENETIC_1.population; i++) {
			this.run(i)
		}
	}

	run = async (id) => {
		this.players[id].run()
	}

	update = () => {
		this.app.stage.removeChildren()
		this.boards.forEach((item, i) => {
			const game = this.games[i]
			item.draw(game.view, game.score)
		})
		if (this.runningGames <= 0) {
			clearInterval(this.loop)
			this.logGeneration()
			this.createNewPopupaltion()
			this.genText = this._gen + 1
			this.start()
		}
	}

	logGeneration = () => {
		this.logger.logGeneration(this.players)
	}

	createNewPopupaltion = () => {
		let genotype = Population.next(this.players)
		for (let i = 0; i < this.players.length; i++) {
			this.players[i].nextUnit = genotype[i];
		}
	}

	gameOver = id => () => {
		this.runningGames--
		this.players[id].onGameOver()
		this.players[id].adaptation = this.games[id].score;
	}
}

export default Genetic1
