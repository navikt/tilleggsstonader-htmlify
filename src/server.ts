import dotenv from 'dotenv';
import express from 'express';

import logger from './felles/logger';
import routes from './routes';

dotenv.config();
export const { NODE_ENV } = process.env;

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

const port = NODE_ENV === 'development' ? 8001 : 3000;
app.listen(port, () => {
    logger.info(`Server now listening on port: ${port}`);
});
