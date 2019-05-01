import Genetic1 from "./Genetic1/Genetic1";
// import SinglePlayer from "./SinglePlayer/SinglePlayer";

class Root {
	
	render(parentElement){
		// new SinglePlayer().render(parentElement)
		new Genetic1().render(parentElement)
	}
}

export default Root
