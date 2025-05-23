import config from "../../config";
import { Database as SqliteDatabase, open } from "sqlite";
import { Database, Statement } from "sqlite3";
import { DatabaseConnectionException } from "../../util/exceptions/DatabaseConnectionException";
import logger from "../../util/logger";

export class ConnectionManager {
    // getConnection() // returns a db connection instance "the same instance every time it gets called".
    private static db: SqliteDatabase<Database, Statement> | null = null;

    private constructor() {}

    public static async getConnection(): Promise<SqliteDatabase<Database, Statement>> {
        if (this.db === null) {
            try {
                this.db = await open({
                    filename:config.storagePath.sqlite,
                    driver: Database
                });
            } catch (error) {
                logger.error("Failed to connect to database", error as Error)
                throw new DatabaseConnectionException("Failed to connect to database", error as Error);
            }
            
        }
        return this.db;
    }
}