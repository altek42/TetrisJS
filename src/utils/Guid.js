
export default function () {
	return _gen('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx');
}

export function Code() {
	return _gen('xxxxxx');
}

function _gen(pattern) {
	return pattern.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}