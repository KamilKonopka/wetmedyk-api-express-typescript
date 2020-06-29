import express from 'express';
import dotenv from 'dotenv';
import config from 'config';
import * as env from 'env-var';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import debug from 'debug';
import Joi from 'joi';
import * as _ from 'lodash';
import { AppRoutes } from "./routes.js";
import { createConnection } from "typeorm";
import { Response, Request } from "express";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

createConnection().then(async connection => {
    AppRoutes.forEach((route) => {
        // @ts-ignore
        // tslint:disable-next-line:ban-types
        app[route.method](route.path, (request: Request, response: Response, next:Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });
});

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

