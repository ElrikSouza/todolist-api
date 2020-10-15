import { PORT } from './env';
import { app } from './app';

export const server = app.listen(PORT);
