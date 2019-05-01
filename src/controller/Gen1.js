import { BOARD } from "../Game.config";

class Gen1 {
	constructor(tetris, onUpdate) {
		this._tetris = tetris;
		this._onUpdate = onUpdate;
		this.initParams();
	}

	get _randWeight() {
		return (Math.random() - 0.5) * 2
	}

	set weight(param) {
		const {
			height,
			holes,
			flatnes,
			clear,
		} = param;
		if (height === undefined
			|| holes === undefined
			|| flatnes === undefined
			|| clear === undefined) {
			console.error('Wrong fields for weight. It should be {height, holes, flatnes, clear}');
			return;
		}
		this._weight = param
	}

	initParams = () => {
		this._weight = {
			height: this._randWeight,
			holes: this._randWeight,
			flatnes: this._randWeight,
			clear: this._randWeight,
		}
	}

	run() {
		this._tetris.reset();
		this._gameOver = false;
		// while (this._gameOver) {
		// this._checkMove()
		// }
	}

	_checkMove() {
		for (let x = 0; x < BOARD.width; x++)
			for (let rot = 0; rot < 4; rot++) {
				_move(x, rot)
				_rate()
			}
	}

	_move(x, rot, confirm = false) {
		this._tetris.brickStartPosition = { x, rot }
		this._tetris.confirmMove(confirm)
	}

	_rate() {
		this._rate = {}

	}

	_getProperties() {
		const view = this._tetris.view
		let holes = 0, clear = 0;

		let hArr = new Array(BOARD.width).fill(0)

		for (let y = 0; y < view.length; y++) {
			for (let x = 0; x < view[y].length; x++) {
				if (view[y][x] !== 0) {
					if (hArr[x] === 0) hArr[x] = BOARD.height - y
				} else {
					if (hArr[x] !== 0) holes += 1
				}
			}
			if (view[y].includes(0)) clear += 1
		}

		let height = hArr[0], flatnes = 0;
		for (let i = 1; i < hArr.length; i++) {
			height += hArr[i];
			flatnes += Math.abs(hArr[i] - hArr[i - 1])
		}

		return { height, holes, flatnes, clear };
	}

	onGameOver = () => {
		this._gameOver = true;
	}
}

export default Gen1
