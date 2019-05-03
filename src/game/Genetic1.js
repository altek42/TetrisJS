import Gen1 from "../controller/Gen1";
import Tetris from "../tetris/Tetris";
import { Application } from "pixi.js";
import Board from "../presentation/Board";
import { BOARD_RENDER, GENETIC_1 } from "../Game.config";
import Population from "../controller/utils/Population";

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

		this.app = new Application({
			width: (BOARD_RENDER.width + BOARD_RENDER.margin) * columns,
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
		this.start()

		// //TEST
		// let createOb = (n) => ({
		// 	weight: { a: n, b: n, c: n, d: n },
		// 	adaptation: n,
		// })
		// let arr = new Array(8).fill(0).map( (x,i) => createOb(i) )
		// arr = Population.next(arr); console.log(arr); arr = arr.map( (x,i) => ({weight: x, adaptation: i}));
		// arr = Population.next(arr); console.log(arr); arr = arr.map( (x,i) => ({weight: x, adaptation: i}));
		// arr = Population.next(arr); console.log(arr); arr = arr.map( (x,i) => ({weight: x, adaptation: i}));
		// arr = Population.next(arr); console.log(arr); arr = arr.map( (x,i) => ({weight: x, adaptation: i}));
		// //END TEST

		this.label = document.createElement('p');
		this.rootElement.appendChild(this.label)
		this.label.className = 'gen-text'
		this.genText = 0
	}

	start() {
		this.runAll()
		this.loop = setInterval(() => {
			this.update()
		}, 200);
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
			this.createNewPopupaltion()
			this.genText = this._gen + 1
			this.start()
		}
	}

	createNewPopupaltion = () => {
		let populationWeights = Population.next(this.players)
		for (let i = 0; i < this.players.length; i++) {
			this.players[i].weight = populationWeights[i];
		}
	}

	gameOver = id => () => {
		this.runningGames--
		this.players[id].onGameOver()
		this.players[id].adaptation = this.games[id].score;
	}
}

export default Genetic1
