import mysql, {Connection, ConnectionConfig} from 'mysql';

export const connectionConfig: ConnectionConfig = {
    host: 'sql.city3studio.nazwa.pl',
    user: 'city3studio_1',
    password: 'IwonaWasilewska2014',
    database: 'city3studio_1'
};

export class MysqlDb {

    private connection: Connection;

    createConnection(): Connection {
         return this.connection = mysql.createConnection(connectionConfig);
    }

    // queryMysqlDb() {
    //     this.connection.query({});
    // }

    endConnection() {
        this.connection.end();
    }
}
