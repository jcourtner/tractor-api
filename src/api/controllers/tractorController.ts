import { Request, Response } from 'express';
import { addToQueue } from '../../services/tractor';
import { parseTractorCommand } from '../../utils/parse';

export function handleIncomingCommand(req: Request, res: Response) {
	try {
		// parse first to validate it's an actual command
		const parsed = parseTractorCommand(req.body);

		// add the command to the queue
		addToQueue(parsed);
		res.status(200).json({ message: 'Command received' });
	} catch (error) {
		res.status(400).send('Invalid command');
	}
}
