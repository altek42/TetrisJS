import Game from '../../game/Genetic1'
import { HomeButton } from '../../components/Button';

class Genetic1 {
	
	render(parentElement) {
		const e = document.createElement('div')
		e.className='container'

		new Game(e)

		parentElement.appendChild(e);
		parentElement.appendChild(HomeButton())
	}
}

export default Genetic1
