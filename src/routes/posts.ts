import express from 'express';
import {MysqlDb} from "../database/mysql-db";
import {prepareMysqlQuery} from "../database/queries";

export const router = express.Router();
export const routePath = 'posts';

router.get('/', (req, res) => {
    const sql = prepareMysqlQuery(routePath, req.params, req.query);
    const connection = new MysqlDb().createConnection();
    connection.query(sql, (err, result, fields) => {
        connection.end();
        return err ? res.status(404).send(err.message) : res.status(200).send(result);
    });
});

router.get('/:ID', ((req, res) => {
    const connection = new MysqlDb().createConnection();
    const sql = prepareMysqlQuery(routePath, req.params, req.query);
    // const sql = connection.format(`SELECT * FROM wp_${routePath} WHERE ID=?;`, [req.params.ID]);
    connection.query(sql, (err, result, fields) => {
        connection.end();
        return err ? res.status(404).send(err.message) : res.status(200).send(result);
    });
}));

