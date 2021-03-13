import express from 'express';
import dotenv from 'dotenv';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as _ from 'lodash';
import { AppRoutes } from "./routes.js";
import { createConnection } from "typeorm";
import { Response, Request } from "express";
import { requireJwtMiddleware } from "./session/RequireJwtMiddleware";
import env from 'env-var';
import busboy from 'connect-busboy';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
export const imagePath = 'public/images';
export const SECRET_KEY = env.get('SECRET_KEY').required().asString();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(busboy());

createConnection().then(async connection => {
    AppRoutes.forEach((route) => {
        // @ts-ignore
        // tslint:disable-next-line:ban-types
        app[route.method](route.path, route.requireJwt ? requireJwtMiddleware : cors(), (request: Request, response: Response, next: Function) => {

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

app.get('/', (req: Request, res: Response) => {
    res.send('WetMedyk Rest API');
});

console.log(`${config.get('name')}: in ${_.startCase(env.get('NODE_ENV').asString())}`);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
