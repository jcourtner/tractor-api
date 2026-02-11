export type Direction = 'N' | 'S' | 'E' | 'O';

export interface TractorPosition {
	x: number;
	y: number;
	direction: Direction;
}

type InitialPosition = { type: 'S'; x: number; y: number; dir: Direction };
type MoveForward = { type: 'A'; value: number };
type TurnLeft = { type: 'G' };
type TurnRight = { type: 'D' };

export type Command = InitialPosition | MoveForward | TurnLeft | TurnRight;
