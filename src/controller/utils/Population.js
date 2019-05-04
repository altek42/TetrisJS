import { GEN_POPULATION } from "../../Game.config";


class Population {

	/**
	* oldPopulation = ArrayOf({
	* 	weight = {},
	* 	adaptation = number,
	* 	code = string
	* })
	* 
	* @returm ArrayOf({
	* 	weight = {},
	* 	parents = ArrayOf(string)
	* })
	*/
	static next(oldPopulation) {
		const champions = this._selectPopulation(oldPopulation)
		const population = this._crossPopulation(champions)
		return this._mutatePopulation(population)
	}

	static _selectPopulation(oldPopulation) {
		let champions = []
		oldPopulation.forEach(e => {
			champions.push(this._getChampion(oldPopulation))
		});
		return champions
	}

	static _getChampion(oldPopulation) {
		const len = oldPopulation.length;
		let r = this._randInt(0, len);
		let best = r;
		for (let i = 0; i < GEN_POPULATION.champions - 1; i++) {
			r = this._randInt(0, len);
			if (oldPopulation[best].adaptation < oldPopulation[r].adaptation) {
				best = r
			}
		}
		return oldPopulation[r]
	}

	static _randInt(min, max) {
		return Math.floor(Math.random() * max) + min
	}

	static _crossPopulation(population) {
		const len = population.length;
		let newPopulation = []
		for (let i = 0; i < len; i += 2) {
			const crossed = this._cross(population[i], population[i + 1])
			newPopulation.push(crossed[0])
			newPopulation.push(crossed[1])
		}
		return newPopulation;
	}

	static _cross(a, b) {
		if (Math.random() > GEN_POPULATION.cross) {
			return [
				{ weight: a.weight, parents: [a.code] }, 
				{ weight: b.weight, parents: [b.code] }, 
			]
		}
		const aV = Object.values(a.weight);
		const bV = Object.values(b.weight);

		const r = this._randInt(1, aV.length-1)
		const aN = [
			...aV.slice(0, r),
			...bV.slice(r, aV.length)
		]

		const bN = [
			...bV.slice(0, r),
			...aV.slice(r, aV.length)
		]

		let aO = {}, bO = {};
		Object.keys(a.weight).forEach((key, i) => {
			aO[key] = aN[i]
			bO[key] = bN[i]
		})
		const parents = [a.code, b.code]
		return [
			{ weight: aO, parents }, 
			{ weight: bO, parents }, 
		]
	}

	static _mutatePopulation(population) {
		for (let i in population) {
			population[i] = this._mutation(population[i])
		}
		return population
	}

	static _mutation(a) {
		for (let key in a.weight) {
			if(Math.random() <= GEN_POPULATION.mutate){
				const factor = Math.random() - 0.5;
				a.weight[key] = a.weight[key] + ( a.weight[key] * factor)
			}
		}
		return a
	}
}

export default Population
