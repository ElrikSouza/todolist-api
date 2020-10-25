import Helmet from 'helmet';
import Cors from 'cors';
import Express, { json, Router } from 'express';
import { ALLOWED_ORIGIN } from './env';
import { errorHandlerMiddleWare } from './http-helpers/error-handler';
import { authenticationModule } from './auth';
import { taskListModule } from './task-list';

const app = Express();
const appModules = Router().use(authenticationModule).use(taskListModule).use(errorHandlerMiddleWare);

app.use(Helmet());
app.use(Cors({ origin: ALLOWED_ORIGIN }));
app.use(json());
app.use('/api/v1', appModules);

export { app };
