import express from 'express';
import {MysqlDb} from "../database/mysql-db";
import * as _ from 'lodash';

export const router = express.Router();

router.get('/', (req, res) => {
    const sql = 'SELECT * from wp_posts WHERE post_mime_type != "image/jpeg" AND post_status="publish" AND post_type="page"; ';
    const connection = new MysqlDb().createConnection();
    connection.query(sql, (err, result, fields) => {
        connection.end();
        return err ? res.status(404).send(err.message) : res.status(200).send(result);
    });
});

function objectToCamelCase(obj: object): object {
    return _.mapKeys(obj, (value, key) => _.camelCase(key))
}
