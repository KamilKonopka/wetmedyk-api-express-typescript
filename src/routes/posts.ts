import express from 'express';
import { connectionConfig } from '../database/mysql-db';
import mysql from 'mysql';

export const router = express.Router();

router.get('/', (req, res) => {
    const connection = mysql.createConnection(connectionConfig);
    connection.connect();
    const sql = 'SELECT * from wp_posts; ';
    connection.query(sql, (err, results, fields) => {
        if (err) {
            return new Error(err.message);
        } else {
            return results ? res.send(results) : res.status(404).send('Posts not found');
        }
    });
    connection.end();
});

router.get('/:id', ((req, res) => {
    const sql = `SELECT * from wp_posts WHERE ID="${req.params.id}";`;
    const connection = mysql.createConnection(connectionConfig);
    connection.connect();
    connection.query(sql, (err, results, fields) => {
        if (err) {
            return new Error(err.message);
        } else {
            return results.length ? res.send(results.shift()) : res.status(404).send('Post not found');
        }
    });
    connection.end();
}));


