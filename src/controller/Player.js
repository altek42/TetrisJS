
class Player {
	constructor(tetris, onUpdate) {
		this._tetris = tetris;
		this._onUpdate = onUpdate;

		window.addEventListener("keydown", this.handleKeyDown);
		this._loop = setInterval(this.onDown, 500)
	}

	handleKeyDown = event => {
		switch (event.key) {
			case 'd':
			case 'ArrowRight':
				this.onRight()
				break;
			case 'a':
			case 'ArrowLeft':
				this.onLeft()
				break;
			case 's':
			case 'ArrowDown':
				this.onDown()
				break;
			case 'n':
			case 'Enter':
				this.onConfirm();
				break;
			case 'm':
			case "'":
				this.onRotate();
				break;
			case 'r':
				this.reset();
				break;
			default: break;
		}
	}

	onDown = () => {
		this._tetris.moveDown();
		this._onUpdate();
	}

	onLeft = () => {
		this._tetris.moveLeft();
		this._onUpdate();
	}

	onRight = () => {
		this._tetris.moveRight();
		this._onUpdate();
	}

	onRotate = () => {
		this._tetris.rotate();
		this._onUpdate();
	}

	onConfirm = () => {
		this._tetris.confirmMove();
		this._onUpdate();
	}

	reset = () => {
		this._tetris.reset();
		this._onUpdate();
	}

	release() {
		window.removeEventListener("keydown", this.handleKeyDown);
		clearInterval(this._loop);
	}
}

export default Player
