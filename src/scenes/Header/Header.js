import pjson from '../../../package.json';

class Header {

	render(parentElement) {
		const e = document.createElement('h2')
		e.innerText = `Tetris v${pjson.version}`
		e.className = 'header'
		parentElement.appendChild(e)
	}
}

export default Header
