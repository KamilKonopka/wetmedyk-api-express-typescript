import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router as employees } from './routes/employees';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use('/employees', employees);

app.get('/', (req, res) => {
    res.send('Test');
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening to port ${port}`);
});
