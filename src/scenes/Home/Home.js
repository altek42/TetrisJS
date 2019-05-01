import Store from '../../utils/Store'
import Button from '../components/Button';

class Home {

	redirect = (path) => () => {
		Store.set('loc', path)
	}

	render = (parentElement) => {
		const e = document.createElement('div')
		e.className = 'home'

		e.appendChild(Button('Single player', this.redirect('/player')));
		e.appendChild(Button('Genetic Algorithm', this.redirect('/ai')));

		parentElement.appendChild(e)
	}
}

export default Home
