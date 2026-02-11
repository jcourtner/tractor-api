import { Command, TractorPosition } from '../types/tractor';

const queue: Command[] = [];

// flag to track if the commands are being processed
let isProcessing = false;

export let tractorPosition: TractorPosition = { x: 0, y: 0, direction: 'N' }; // initial starting point

export const addToQueue = (command: Command) => {
	// add to queue
	queue.push(command);
	// start to process the commands
	processCommands();
};

export const processCommands = async () => {
	if (isProcessing) return;
	isProcessing = true;
	// loop through queue until queue has no more
	while (queue.length > 0) {
		// shift off first in the queue and process the command
		const curr: Command = queue.shift()!;
		// here we use await, because we don't want to start the next command until this one is processed
		await executeCommand(curr);
	}
	isProcessing = false;
};

const executeCommand = async (curr: Command) => {
	const { type } = curr;

	switch (type) {
		case 'S':
			// set the new tractor position
			tractorPosition.x = curr.x;
			tractorPosition.y = curr.y;
			tractorPosition.direction = curr.dir;

			console.log(
				`Tractor position: (${tractorPosition.x}, ${tractorPosition.y}, ${tractorPosition.direction})`,
			);
			break;
		case 'A':
			// if the dir is north or south, move on the y axis
			// if the dir is east or west, move on the x axis
			for (let i = 0; i < curr.value; i++) {
				await new Promise<void>((resolve) => setTimeout(resolve, 500));
				if (tractorPosition.direction === 'E') tractorPosition.x += 1;
				if (tractorPosition.direction === 'O') tractorPosition.x -= 1;
				if (tractorPosition.direction === 'N') tractorPosition.y += 1;
				if (tractorPosition.direction === 'S') tractorPosition.y -= 1;
				console.log(
					`Tractor position: (${tractorPosition.x}, ${tractorPosition.y}, ${tractorPosition.direction})`,
				);
			}
			console.log(
				`Tractor position: (${tractorPosition.x}, ${tractorPosition.y}, ${tractorPosition.direction})`,
			);

			break;
		case 'G':
			// turn 90 degress to the left
			await new Promise<void>((resolve) => setTimeout(resolve, 100));
			if (tractorPosition.direction === 'N') tractorPosition.direction = 'O';
			else if (tractorPosition.direction === 'O')
				tractorPosition.direction = 'S';
			else if (tractorPosition.direction === 'S')
				tractorPosition.direction = 'E';
			else if (tractorPosition.direction === 'E')
				tractorPosition.direction = 'N';

			console.log(
				`Tractor position: (${tractorPosition.x}, ${tractorPosition.y}, ${tractorPosition.direction})`,
			);
			break;
		case 'D':
			// turn 90 degress to the right
			await new Promise<void>((resolve) => setTimeout(resolve, 100));
			if (tractorPosition.direction === 'N') tractorPosition.direction = 'E';
			else if (tractorPosition.direction === 'E')
				tractorPosition.direction = 'S';
			else if (tractorPosition.direction === 'S')
				tractorPosition.direction = 'O';
			else if (tractorPosition.direction === 'O')
				tractorPosition.direction = 'N';
			console.log(
				`Tractor position: (${tractorPosition.x}, ${tractorPosition.y}, ${tractorPosition.direction})`,
			);
			break;
	}
};
