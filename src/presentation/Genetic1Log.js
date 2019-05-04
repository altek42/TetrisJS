import { contrast } from "../utils/HexParse";

class Genetic1Log {
	constructor(rootElement) {
		const root = document.createElement('div');
		rootElement.appendChild(root);
		this._rootElement = root
		this._counter = 0
	}

	logGeneration(population) {
		const row = document.createElement('div');
		row.className = 'log-row'
		this._rootElement.appendChild(row)
		const header = document.createElement('p')
		header.innerText = `Generation: ${this._counter}`
		this._counter += 1;
		row.appendChild(header);
		const childContainer = document.createElement('div');
		childContainer.className = 'log-row-container'
		row.appendChild(childContainer);

		population.forEach(x => {
			childContainer.appendChild(
				this._formatUnit(x)
			)
		})
	}

	_formatUnit(unit) {
		const container = document.createElement('div')

		const code = document.createElement('p')
		code.innerHTML = `Code: <b style="color: #${unit.code}; background-color: #${contrast(unit.code)};">${unit.code}</b>`;
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
