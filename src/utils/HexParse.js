

export function contrast(hexStr) {
	let x = hexToRgb(hexStr)
	let luminance = ( 0.299 * x.r + 0.587 * x.g + 0.114 * x.b)/255;

	return luminance > 0.5 ? "000000" : 'ffffff'
}

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}