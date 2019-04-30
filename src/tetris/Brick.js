import BrickType, { BrickTypeLength } from './BrickType'
import BrickShape from './BrickShape'

class Brick {
	constructor(type) {
		this._type = type
		this._shape = BrickShape(type);
	}
	get shape() { return this._shape }

	rotate(){
		this._shape = this._shape.rotate90()
	}

	static rand() {
		const r = Math.floor(Math.random() * BrickTypeLength)
		const type = Object.values(BrickType)[r]
		return new Brick(type)
	}
}

export default Brick
