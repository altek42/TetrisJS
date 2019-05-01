import './extensions/extensions';

import pjson from '../package.json';
import Root from './scenes/Root';
import Store from './utils/Store'

console.log("TETRIS", pjson.version);


class Program {

	static main(){
		const rootElement = document.getElementById('app')
		const root = new Root();

		root.render(rootElement);

		Store.onUpdate = () => {
			rootElement.innerHTML = "";
			root.render(rootElement);
		}
	}
}

Program.main();