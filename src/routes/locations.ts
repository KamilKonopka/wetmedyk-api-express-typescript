import express from 'express';
import {MysqlDb} from "../database/mysql-db";
import {mapValues, prepareGetMysqlQuery} from "../database/queries";
import * as _ from "lodash";

export const router = express.Router();
export const routePath = 'locations';

router.get('/', (req, res) => {
    const connection = new MysqlDb().createConnection();
    const query = prepareGetMysqlQuery(routePath, req.params, req.query);
    const values = mapValues(_.merge(req.params, req.query));
    const sql = connection.format(query, values);
    connection.query(sql, (err, result, fields) => {
        connection.end();
        return err ? res.status(404).send(err.message) : res.status(200).send(result);
    });
});

router.get('/:ID', ((req, res) => {
    const connection = new MysqlDb().createConnection();
    const query = prepareGetMysqlQuery(routePath, req.params, req.query);
    const values = mapValues(_.merge(req.params, req.query));
    const sql = connection.format(query, values);
    connection.query(sql, (err, result, fields) => {
        connection.end();
        return err ? res.status(404).send(err.message) : res.status(200).send(result);
    });
}));

