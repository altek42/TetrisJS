import Button from "../components/Button";

class NavigationGenetic1 {

	constructor(rootElement, props) {
		this._props = props
		this._root = document.createElement('div')
		this._root.className = 'nav-row'
		rootElement.appendChild(this._root)
		
		this._genLabel = document.createElement('p')
		this._genLabel.className = 'gen-text'
		this._root.appendChild(this._genLabel)
		this._showGen()

		this._startBtn = Button('Start', this._handleStartBtnClick)
		this._pause = true;
		this._root.appendChild(this._startBtn)
	}

	_handleStartBtnClick = () => {
		this._pause = !this._pause;
		const { onPause, onStart } = this._props;
		if(this._pause){
			this._startBtn.innerText = 'Start'
			onPause();
		}else{
			this._startBtn.innerText = 'Stop'
			onStart();
		}
	}

	_generation = 0

	nextGen() {
		this._generation += 1
		this._showGen()
	}

	_showGen() {
		this._genLabel.innerText = `Gen: ${this._generation}`
	}



}

export default NavigationGenetic1
