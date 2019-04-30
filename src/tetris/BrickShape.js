import BrickType from "./BrickType";

function BrickShape(brickType) {
	switch (brickType) {
		case BrickType.Z: return [[1,1,0],[0,1,1]];
		case BrickType.S: return [[0,2,2],[2,2,0]];
		case BrickType.T: return [[3,3,3],[0,3,0]];
		case BrickType.L: return [[0,0,4],[4,4,4]];
		case BrickType.J: return [[5,5,5],[0,0,5]];
		case BrickType.I: return [[6, 6, 6, 6]];
		case BrickType.O: return [[7, 7], [7, 7]];
		default: return [];
	}
}

export default BrickShape
