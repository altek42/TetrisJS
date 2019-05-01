import SinglePlayerGame from '../../game/SinglePlayer'
import Instruction from './Instruction';
import { HomeButton } from '../components/Button'
class SinglePlayer {

	render(parentElement) {
		const root = document.createElement('div')

		const e = document.createElement('div')
		e.className = 'container'

		this.game = new SinglePlayerGame(e)
		new Instruction().render(e)

		root.appendChild(e)
		root.appendChild(HomeButton())

		parentElement.appendChild(root);
	}
}

export default SinglePlayer
