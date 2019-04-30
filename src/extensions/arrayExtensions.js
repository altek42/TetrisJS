Array.prototype.transpose = function () {
	return this[0].map((col, i) => this.map(row => row[i]));
}

Array.prototype.rotate90 = function () {
	return this.transpose().reverse()
}