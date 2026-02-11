import { Router } from 'express';
import { handleIncomingCommand } from '../controllers/tractorController';

const router = Router();

router.post('/', handleIncomingCommand);

export default router;
