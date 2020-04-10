import express from 'express';
import dotenv from 'dotenv';
import config from 'config';
import * as env from 'env-var';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router as posts } from './routes/posts';
import { router as employees } from './routes/employees';
import { router as locations } from './routes/locations';
import helmet from 'helmet';
import morgan from 'morgan';
import { router as pages } from './routes/pages';
import debug from 'debug';
import Joi from 'joi';
import * as _ from 'lodash';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/posts', posts);
app.use('/employees', employees);
app.use('/locations', locations);
app.use('/pages', pages);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

app.get('/', (req, res) => {
    res.send('Test');
});

console.log(`${config.get('name')}: in ${_.startCase(env.get('NODE_ENV').asString())}`);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

