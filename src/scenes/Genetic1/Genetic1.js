import Game from '../../game/Genetic1'

class Genetic1 {
	
	render(parentElement) {
		const e = document.createElement('div')
		e.className='container'

		new Game(e)

		parentElement.appendChild(e);
	}
}

export default Genetic1
