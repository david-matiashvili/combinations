import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes.js';

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

export default app;