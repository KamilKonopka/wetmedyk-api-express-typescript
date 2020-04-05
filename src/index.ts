import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 8080;

app.get('/', (req, res) => {
    res.send('Test');
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening to port ${port}`);
});
