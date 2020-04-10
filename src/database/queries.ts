import * as _ from "lodash";

export const prepareMysqlQuery =
    (table: string, params: { [key: string]: string }, queryParams: { [key: string]: string }): string => {
    const queryStart = `SELECT * FROM wp_${table}`;
    const queryEnd = ';';
    const sqlQuery: string[] = [queryStart];

    if (!_.isEmpty(params) && !_.isEmpty(queryParams)) {
        sqlQuery.push('WHERE', mapParams(params), 'AND', mapParams(queryParams));
    } else if (!_.isEmpty(queryParams) && _.isEmpty(params)) {
        sqlQuery.push('WHERE', mapParams(queryParams));
    } else if (_.isEmpty(queryParams) && !_.isEmpty(params)) {
        sqlQuery.push('WHERE', mapParams(params));
    }
    sqlQuery.push(queryEnd);
    return sqlQuery.join(' ');
};

export function mapParams(object: { [key: string]: string }): string {
    let paramsToQuery = '';
    Object.entries(object).forEach(([key, value], index) => {
        if (index === 0) {
            paramsToQuery += `${key}="${value}"`;
        } else {
            paramsToQuery += ` AND ${key}="${value}"`
        }
    });
    return paramsToQuery;
}
