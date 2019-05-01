import store from './Store'

export default function (
	parentElement, 
	{ path, component }
) {
	const { loc='/' } = store.state
	if(path === loc) component.render(parentElement)
}