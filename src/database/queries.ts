import * as _ from "lodash";
import {StringObject} from "../models/string-object.model";

export const prepareMysqlQuery = (table: string, params: StringObject, queryParams: StringObject): string => {
    const queryStart = `SELECT * FROM wp_${table}`;
    let sqlQuery: string[] = [queryStart];

    if (!_.isEmpty(params)) {
        sqlQuery = [...sqlQuery, 'WHERE', mapParams(params)];
        if (!_.isEmpty(queryParams)) {
            sqlQuery = [...sqlQuery, 'AND', mapParams(queryParams)];
        }
    } else if (!_.isEmpty(queryParams)) {
        sqlQuery = [...sqlQuery, 'WHERE', mapParams(queryParams)];
    }
    return `${sqlQuery.join(' ')};`;
};

export function mapParams(object: StringObject): string {
    let paramsToQuery = '';
    Object.keys(object).forEach((key, index) =>
        index === 0 ? paramsToQuery += `${key}=?` : paramsToQuery += ` AND ${key}=?`);
    return paramsToQuery;
}

export function mapValues(object: StringObject): string[] {
    return Object.values(object).map((value: string) => {
        return value;
    });
}
