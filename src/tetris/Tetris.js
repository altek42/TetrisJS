import Brick from './Brick'
import { BOARD } from '../Game.config';

class Tetris {

	constructor(props = {}) {
		const {
			onGameOver,
		} = props;
		this._onGameOver = onGameOver
		this._width = BOARD.width
		this._height = BOARD.height
		this.reset()
	}

	reset() {
		this._initBoard()
		this._createNewBrick()
		this._score = 0
	}

	get width() { return this._width }
	get height() { return this._height }
	get board() { return this._board.map(x => [...x]) }
	get view() {
		const { x, y } = this._position;
		const shape = this._brick.shape;
		let view = this.board;

		for (let sY = 0; sY < shape.length; sY++) {
			const bY = sY + y;
			for (let sX = 0; sX < shape[sY].length; sX++) {
				const bX = sX + x;

				const v = shape[sY][sX];
				if (v !== 0) {
					view[bY][bX] = v;
				}
			}
		}
		return view;
	}

	_initBoard = () => {
		this._board = new Array(this.height)
		for (let i = 0; i < this._board.length; i++) {
			this._board[i] = new Array(this.width).fill(0)
		}
	}

	_createNewBrick() {
		this._brick = Brick.rand();
		this._position = { x: BOARD.brickX, y: BOARD.brickY }
	}

	get _isBrickPositionValid() {
		const shape = this._brick.shape;
		let { x, y } = this._position;

		for (let sY = 0; sY < shape.length; sY++) {
			let bY = sY + y;
			for (let sX = 0; sX < shape[sY].length; sX++) {
				let bX = sX + x;

				if (shape[sY][sX] !== 0) {
					if (bX < 0) return false;
					if (bX >= this._width) return false;
					if (bY >= this._height) return false;
					if (this._board[bY][bX] !== 0) return false;
				}
			}
		}
		return true;
	}

	_clearFullLines() {
		let lines = 0
		for (let i = 0; i < this._board.length; i++) {
			if (!this._board[i].includes(0)) {
				this._board.splice(i, 1);
				this._board.unshift(new Array(this.width).fill(0))
				lines += 1
			}
		}
		this._addScore(lines)
	}

	_addScore(lines) {
		switch (lines) {
			case 1: this._score += 1; break;
			case 2: this._score += 5; break;
			case 3: this._score += 20; break;
			case 4: this._score += 100; break;
			default: break;
		}
	}

	_newTurn() {
		this._connectBoardWithBrick()
		this._createNewBrick();
		this._clearFullLines();
		if (!this._isBrickPositionValid) {
			this._gameOver()
		}
	}

	_connectBoardWithBrick() {
		this._board = this.view
	}

	moveDown(confirm = true) {
		this._position.y += 1
		if (!this._isBrickPositionValid) {
			this._position.y -= 1
			if (confirm) this._newTurn()
			return false
		}
		return true
	}

	moveLeft() {
		this._position.x -= 1
		if (!this._isBrickPositionValid) {
			this._position.x += 1
		}
	}

	moveRight() {
		this._position.x += 1
		if (!this._isBrickPositionValid) {
			this._position.x -= 1
		}
	}

	rotate() {
		this._brick.rotate()
		let x = this._position.x
		const shape = this._brick.shape;
		const width = shape[0].length;

		let m = (x + width) - this._width;
		if (m <= 0) m = 0;
		this._position.x -= m

		if (!this._isBrickPositionValid) {
			this._position.x += m
			this._brick.rotateNeg()
		}
	}

	confirmMove(confirm = true) {
		while (this.moveDown(confirm));
	}

	get score() {
		return this._score;
	}

	resetBrickPosition() {
		this._position = { x: BOARD.brickX, y: BOARD.brickY }
		this._brick.resetRotation()
	}

	set brickStartPosition({ x, rot }) {
		this._position = { x: BOARD.brickX, y: BOARD.brickY }
		let toStartX = BOARD.brickX;
		while (toStartX > 0) {
			this.moveLeft()
			toStartX -= 1
		}

		this._brick.resetRotation()
		while (rot > 0) {
			this._brick.rotate();
			rot--;
		}
		while (x > 0) {
			this.moveRight()
			x--;
		}
		if (!this._isBrickPositionValid) {
			return false
		}
		return true
	}

	_gameOver() {
		if (this._onGameOver) this._onGameOver();
	}
}

export default Tetris
