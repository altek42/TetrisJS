import { contrast } from "../utils/HexParse";

class Genetic1Log {
	constructor(rootElement) {
		const root = document.createElement('div');
		rootElement.appendChild(root);
		this._rootElement = root
		this._counter = 0
		this._open = false;
	}

	logGeneration(population) {
		const row = document.createElement('div');
		row.className = 'log-row'
		this._rootElement.appendChild(row)
		const headerLabel = document.createElement('p')
		const headerDiv = document.createElement('div')
		headerDiv.appendChild(headerLabel);
		headerDiv.className='log-rov-header'

		this._counter += 1;
		row.appendChild(headerDiv);
		const childContainer = document.createElement('div');
		childContainer.className = 'log-row-container'
		row.appendChild(childContainer);

		let best = population[0]
		population.forEach(x => {
			if(best.adaptation < x.adaptation){
				best = x
			}
			childContainer.appendChild(
				this._formatUnit(x)
			)
		})

		headerLabel.innerHTML = `Generation: ${this._counter}; Best ${this._formatCode(best.code)} Adaptation: ${best.adaptation}`
		headerDiv.onclick = this._handleHeaderClick(childContainer)
		childContainer.style = 'display: none;'
	}

	_handleHeaderClick = element => () => {
		this._open = !this._open;
		if(this._open){
			element.style = ''
		}else{
			element.style = 'display: none;'
		}
	}

	_formatCode = code => `Code: <b style="color: #${code}; background-color: #${contrast(code)};">${code}</b>`

	_formatUnit(unit) {
		const container = document.createElement('div')
		container.className = 'log-row-unit-box'

		const code = document.createElement('p')
		code.innerHTML = this._formatCode(unit.code);
		container.appendChild(code);

		const adaptation = document.createElement('p')
		adaptation.innerText = `Adaptaion: ${unit.adaptation}`;
		container.appendChild(adaptation);

		const parents = document.createElement('div')
		parents.className = 'log-row-unit-1'
		const p1 = document.createElement('p')
		p1.innerText = 'P: '
		parents.appendChild(p1)

		const p2 = document.createElement('div')
		unit.parents.forEach(x => {
			const l = document.createElement('p')
			l.style = `color: #${x}; background-color: #${contrast(x)};`
			l.innerHTML = `<b>${x}</b>`;
			p2.appendChild(l)
		})
		parents.appendChild(p2)
		container.appendChild(parents)

		const hr = document.createElement('hr')
		container.appendChild(hr)

		const wObj = unit.weight;
		Object.keys(wObj).forEach(x => {
			const r = document.createElement('div')
			r.className = 'log-row-unit-1'

			const l1 = document.createElement('p')
			l1.innerText = x + ': ';
			r.appendChild(l1);

			const l2 = document.createElement('p')
			l2.innerText = wObj[x].toFixed(8)
			r.appendChild(l2);

			container.appendChild(r)
		})

		return container;
	}
}

export default Genetic1Log
