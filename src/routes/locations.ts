import express from 'express';
import { connectionConfig } from "../database/mysql-db";
import mysql from 'mysql';
import {prepareQuery} from "../database/queries";
import * as _ from "lodash";

export const router = express.Router();

router.get('/', (req, res) => {
    const sql = prepareQuery('locations');
    const connection = mysql.createConnection(connectionConfig);
    connection.connect();
    connection.query(sql, (err, results: { [key: string]: string | number }[], fields) => {
        if (err) {
            return new Error(err.message);
        } else {

            return results ? res.send(results) : res.status(404).send('Posts not found');
        }
    });
    connection.end();
});

router.get('/:id', ((req, res) => {
    const sql = prepareQuery('locations', req.params.id);
    const connection = mysql.createConnection(connectionConfig);
    connection.connect();
    connection.query(sql, (err, results, fields) => {
        if (err) {
            return new Error(err.message);
        } else {
            return results.length ? res.send(results.shift()) : res.status(404).send('Employee not found');
        }
    });
    connection.end();
}));

// export function mapFieldsIntoCamelCase (results: { [key: string]: string | number }[]): object[] {
//     return results.map((el: { [key: string]: string | number }) => {
//         return Object.entries(el).reduce((obj: {}, [key, value]) => {
//             obj[key] = value;
//             return obj;
//         }, {});
//     });
// }
