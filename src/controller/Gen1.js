import { BOARD } from "../Game.config";
import { Code } from "../utils/Guid";

class Gen1 {
	constructor(tetris, onUpdate = () => { }) {
		this._tetris = tetris;
		this._onUpdate = onUpdate;
		this.initParams();
	}

	get _randWeight() {
		return (Math.random() - 0.5) * 2
	}

	/**
	 * params = {
	 * 	weight={}
	 * 	parents=[]
	 * }
	 */
	set nextUnit({ weight, parents }) {
		this._code = Code()
		this.weight = weight
		this._parents = parents
	}

	get parents() { return this._parents }
	get code() { return this._code }

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
		this._adaptation = 0
	}

	get weight() {
		return this._weight;
	}

	set adaptation(value) {
		this._adaptation = value
	}

	get adaptation() {
		return this._adaptation
	}

	initParams = () => {
		this._weight = {
			height: this._randWeight,
			holes: this._randWeight,
			flatnes: this._randWeight,
			clear: this._randWeight,
		}
		this._adaptation = 0
		this._code = Code()
		this._parents = []
	}

	run() {
		this._tetris.reset();
		this._gameOver = false;

		this._loop()
	}

	_loop = () => {
		while(!this._gameOver){
		// if (this._gameOver) return;
		this._rateMoves()
		const { x, rot } = this._getBestMove()
		this._move(x, rot, true)
		this._onUpdate()
		}
		// setTimeout(this._loop, 100)

	}

	_getBestMove() {
		const best = Object.keys(this._rate).reduce((prev, curr) => {
			return this._rate[prev] > this._rate[curr] ? prev : curr
		})
		const ar = best.split(',')
		return {
			x: parseInt(ar[0]),
			rot: parseInt(ar[1])
		}
	}

	_rateMoves() {
		this._rate = {}
		for (let x = 0; x < BOARD.width; x++)
			for (let rot = 0; rot < 4; rot++) {
				this._rateMove(x, rot)
			}
	}

	_move(x, rot, confirm = false) {
		this._tetris.brickStartPosition = { x, rot }
		this._tetris.confirmMove(confirm)
	}

	_rateMove(x, rot) {
		this._move(x, rot)
		const prop = this._getProperties()
		const weight = this._weight
		let rate = 0
		for (let key in prop) {
			rate += prop[key] * weight[key]
		}
		this._rate[[x, rot]] = rate;
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
