import { Command, Direction } from '../types/tractor';

export const parseTractorCommand = (input: string): Command => {
	// trim extra spaces
	const command = input.trim();

	if (command === 'G') return { type: 'G' };
	if (command === 'D') return { type: 'D' };

	if (command.startsWith('S(') && command.endsWith(')')) {
		const inner = command.slice(2, -1).split(',');
		return {
			type: 'S',
			x: Number(inner[0]),
			y: Number(inner[1]),
			dir: inner[2].trim() as Direction,
		};
	}

	if (command.startsWith('A(') && command.endsWith(')')) {
		const inner = command.slice(2, -1);
		return {
			type: 'A',
			value: Number(inner[0]),
		};
	}

	// if the incoming command doesn't match any of the command types, we'll throw an error
	throw new Error('invalid command');
};
