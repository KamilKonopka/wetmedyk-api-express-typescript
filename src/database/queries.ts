export const prepareQuery = (table: string, id?: string): string => {
    return `SELECT * FROM wp_${table}${id ? ` WHERE ID="${id}"` : ''};`;
};
