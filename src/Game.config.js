
export const BOARD = {
	width: 10,
	height: 20,
	brickX: 3,
	brickY: 0,
}

export const BRICK_SIZE = {
	width: 20,
	height: 20,
	space: 4,
}

export const SCORE_TEXT = {
	fontFamily: "Arial",
	fontSize: 18,
	fill: "white",
}

export const BrickColor = (key) => {
	switch (key) {
		case 1: return 0xe6194B;
		case 2: return 0xf58231;
		case 3: return 0xffe119;
		case 4: return 0x3cb44b;
		case 5: return 0x42d4f4;
		case 6: return 0xf032e6;
		case 7: return 0x4363d8;
		default: return 0x333333;
	}
}

export const BOARD_RENDER = {
	width: BOARD.width * (BRICK_SIZE.space + BRICK_SIZE.width) - BRICK_SIZE.space,
	height: BOARD.height * (BRICK_SIZE.space + BRICK_SIZE.height) + SCORE_TEXT.fontSize,
	margin: BRICK_SIZE.space * 2,
}

export const GENETIC_1 = {
	population: 8,
	rowCount: 2,
}

export const GEN_POPULATION = {
	champions: 3,
	cross: 0.8,
	mutate: 0.1,
}