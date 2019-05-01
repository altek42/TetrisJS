import Genetic1 from "./Genetic1/Genetic1";
import SinglePlayer from "./SinglePlayer/SinglePlayer";
import Route from "../utils/Route";
import Home from "./Home/Home";
import Header from "./Header/Header";

class Root {
	
	render(parentElement){
		new Header().render(parentElement);
		
		Route(parentElement, {
			path: '/',
			component: new Home()
		})

		Route(parentElement, {
			path: '/player',
			component: new SinglePlayer()
		})

		Route(parentElement, {
			path: '/ai',
			component: new Genetic1()
		})
	}
}

export default Root
