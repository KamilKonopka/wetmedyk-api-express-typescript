import express from 'express';
import {MysqlDb} from "../database/mysql-db";

export const router = express.Router();
export const routePath = 'posts';

router.get('/', (req, res) => {
    const sql = `SELECT * from wp_${routePath};`;
    const connection = new MysqlDb().createConnection();
    connection.query(sql, (err, result, fields) => {
        connection.end();
        return err ? res.status(404).send(err.message) : res.status(200).send(result);
    });
});

router.get('/:id', ((req, res) => {
    const connection = new MysqlDb().createConnection();
    const sql = connection.format(`SELECT * FROM wp_${routePath} WHERE ID=?;`, [req.params.id]);
    connection.query(sql, (err, result, fields) => {
        connection.end();
        return err ? res.status(404).send(err.message) : res.status(200).send(result);
    });
}));

