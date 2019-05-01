
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
		case 1: return 0xFF0000;
		case 2: return 0x00FF00;
		case 3: return 0x0080ff;
		case 4: return 0xFFFF00;
		case 5: return 0x00FFFF;
		case 6: return 0xFF00FF;
		case 7: return 0x8800FF;
		default: return 0x333333;
	}
}

export const BOARD_RENDER = {
	width: BOARD.width * (BRICK_SIZE.space + BRICK_SIZE.width) - BRICK_SIZE.space,
	height: BOARD.height * (BRICK_SIZE.space + BRICK_SIZE.height) + SCORE_TEXT.fontSize,
	margin: BRICK_SIZE.space * 2,
}