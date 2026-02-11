import express from 'express';
import tractorRouter from './api/routes/tractorRouter';
import { errorHandler } from './api/middleware/errorHandler';

const app = express();

app.use(express.text()); // parse request body as plain text

// mount routes
app.use('/', tractorRouter);

// error handler
app.use(errorHandler);

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
