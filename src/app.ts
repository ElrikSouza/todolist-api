import Helmet from 'helmet';
import Cors from 'cors';
import Express, { json } from 'express';
import { ALLOWED_ORIGIN } from './env';
import { errorHandlerMiddleWare } from './http-helpers/error-handler';
import { authenticationModule } from './auth';

const app = Express();
app.use(Helmet());
app.use(Cors({ origin: ALLOWED_ORIGIN }));
app.use(json());
app.use(authenticationModule);
app.use(errorHandlerMiddleWare);

export { app };
