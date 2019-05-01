
class Store {
	_state = {}

	get state() {
		return { ...this._state };
	}

	set onUpdate(f) {
		this._onUpdate = f
	}

	set = (key, value) => {
		this._state[key] = value;
		this._emitUpdate();
	}

	setState = (newState) => {
		this._state = newState
		this._emitUpdate();
	}

	_emitUpdate = () => {
		console.log('state', this._state);
		
		if (this._onUpdate) this._onUpdate();
	}
}

const s = new Store();

export default s
