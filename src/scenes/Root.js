import SinglePlayer from "./SinglePlayer/SinglePlayer";

class Root {
	
	render(parentElement){
		new SinglePlayer().render(parentElement)
	}
}

export default Root
