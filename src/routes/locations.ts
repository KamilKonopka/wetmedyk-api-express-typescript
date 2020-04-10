import express from 'express';
import {MysqlDb} from "../database/mysql-db";
import {prepareMysqlQuery} from "../database/queries";

export const router = express.Router();
export const routePath = 'locations';

router.get('/', (req, res) => {
    // const sql = `SELECT * FROM wp_${routePath};`;
    const sql = prepareMysqlQuery(routePath, {}, req.query);
    const connection = new MysqlDb().createConnection();
    connection.query(sql, (err, result, fields) => {
        connection.end();
        return err ? res.status(404).send(err.message) : res.status(200).send(result);
    });
});

router.get('/:ID', ((req, res) => {
    const connection = new MysqlDb().createConnection();
    const sql = prepareMysqlQuery(routePath, req.params, {});
    // const sql = connection.format(`SELECT * FROM wp_${routePath} WHERE ID=?;`, [req.params.id]);

    connection.query(sql, (err, result, fields) => {
        connection.end();
        return err ? res.status(404).send(err.message) : res.status(200).send(result);
    });
}));

