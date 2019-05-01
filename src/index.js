import './extensions/extensions';

import pjson from '../package.json';
import Root from './scenes/Root';

console.log("TETRIS", pjson.version);


class Program {

	static main(){
		const rootElement = document.getElementById('app')
		new Root().render(rootElement)
	}

}

Program.main();