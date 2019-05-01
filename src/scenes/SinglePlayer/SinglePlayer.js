import SinglePlayerGame from '../../game/SinglePlayer'
import Instruction from './Instruction';

class SinglePlayer {
	
	render(parentElement) {
		const e = document.createElement('div')
		e.className='container'

		this.game = new SinglePlayerGame(e)
		new Instruction().render(e)

		parentElement.appendChild(e);
	}
}

export default SinglePlayer
