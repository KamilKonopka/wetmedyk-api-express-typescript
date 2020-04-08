import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from 'config';
import { router as posts } from './routes/posts';
import { router as employees } from './routes/employees';
import { router as locations } from './routes/locations';
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use('/posts', posts);
app.use('/employees', employees);
app.use('/locations', locations);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

// tslint:disable-next-line:no-console
console.log(config.get('name'));

app.get('/', (req, res) => {
    res.send('Test');
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening to port ${port}`);
});
