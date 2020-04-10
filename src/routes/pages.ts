import express from 'express';
import {MysqlDb} from "../database/mysql-db";
import * as _ from 'lodash';
import {mapValues, prepareMysqlQuery} from "../database/queries";

export const router = express.Router();
const routePath = 'posts';

router.get('/', (req, res) => {
    const connection = new MysqlDb().createConnection();
    const query = prepareMysqlQuery(routePath, req.params, req.query);
    const values = mapValues(_.merge(req.params, req.query));
    const sql = connection.format(query, values);
    connection.query(sql, (err, result, fields) => {
        connection.end();
        return err ? res.status(404).send(err.message) : res.status(200).send(result);
    });
});

function objectToCamelCase(obj: object): object {
    return _.mapKeys(obj, (value, key) => _.camelCase(key))
}
