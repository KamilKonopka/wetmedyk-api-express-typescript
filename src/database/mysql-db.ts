import mysql, {Connection, ConnectionConfig} from "mysql";
import * as env from "env-var";

export class MysqlDb {
    private readonly connectionConfig: ConnectionConfig = {};
    constructor() {
        this.connectionConfig = this.getConnectionConfig();
    }

    private getConnectionConfig(): ConnectionConfig {
        return {
            host: env.get('DB_HOSTNAME').required().asString(),
            user: env.get('DB_USERNAME').required().asString(),
            password: env.get('DB_PASSWORD').required().asString(),
            database: env.get('DB_DATABASE').required().asString()
        } as ConnectionConfig;
    }

    createConnection(): Connection {
        const connection = mysql.createConnection(this.connectionConfig);
        connection.connect();
        return connection;
    }
}
