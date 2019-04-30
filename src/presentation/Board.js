import { Graphics } from 'pixi.js'
import { BRICK_SIZE, BrickColor } from '../Game.config';

class Board {
	constructor(app, { x, y }) {
		this._app = app
		this._x = x;
		this._y = y;
	}

	draw = (state) => {
		for (let y = 0; y < state.length; y++)
			for (let x = 0; x < state[y].length; x++)
				this._drawBrick(x, y, state[y][x])
	}

	_calcPosition = (x, y) => ({
		px: this._x + (x * (BRICK_SIZE.width + BRICK_SIZE.space)),
		py: this._y + (y * (BRICK_SIZE.height + BRICK_SIZE.space)),
	})

	_drawBrick = (x, y, color) => {
		const { px, py } = this._calcPosition(x, y)

		let r = new Graphics();
		r.beginFill(BrickColor(color));
		r.drawRect(0, 0, BRICK_SIZE.width, BRICK_SIZE.height)
		r.endFill();

		r.x = px;
		r.y = py;
		this._app.stage.addChild(r);
	}
}

export default Board
