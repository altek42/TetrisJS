import Store from '../../utils/Store'

export function Button(label, onClick) {
	const e = document.createElement('button')
	e.onclick = onClick
	e.innerText = label
	return e;
}

export function HomeButton() {
	const container = document.createElement('div')
	container.className = 'home-button'
	
	const e = Button('Home', () => { Store.set('loc', '/') })
	container.appendChild(e)

	return container;
}

export default Button;