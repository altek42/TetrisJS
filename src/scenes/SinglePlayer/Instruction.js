
class Instruction {
	
	line(parent, text){
		const e = document.createElement('p')
		e.innerText = text;
		parent.appendChild(e);
	}

	render(parentElement){
		const e = document.createElement('div')
		this.line(e,'[d], [ArrowRight] - move right')
		this.line(e,'[a], [ArrowLeft] - move left')
		this.line(e,'[s], [ArrowDown] - move down')
		this.line(e,'[n], [Enter] - confirm move')
		this.line(e,'[m], [\'] - rotate')
		this.line(e,'[r] - reset game')
		parentElement.appendChild(e);
	}
}

export default Instruction
