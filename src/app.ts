import Helmet from 'helmet';
import Cors from 'cors';
import Express, { json } from 'express';
import { ALLOWED_ORIGIN } from './env';

const app = Express();
app.use(Helmet());
app.use(Cors({ origin: ALLOWED_ORIGIN }));
app.use(json());

export { app };
