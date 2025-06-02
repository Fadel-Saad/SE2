import { Pool } from "pg";
import logger from "../../util/logger";
import { DatabaseConnectionException } from "../../util/exceptions/DatabaseConnectionException";
import config from "../../config";


export class connectionManager {
    private static db: Pool | null = null;

    private constructor() {}

    public static async getConnection(): Promise<Pool> {
        if (this.db === null) {
            try {
                    this.db = new Pool({
                        connectionString: config.postgreURL,
                        ssl: {
                            rejectUnauthorized: false
                        },
                    })
                
            } catch (error) {
                logger.error("Failed to connect to database", error as Error)
                throw new DatabaseConnectionException("Failed to connect to database", error as Error);
            }
            
        }
        return this.db;
    }

    public static async closeConnection(): Promise<void> {
        if (this.db) {
            await this.db.end();
            this.db = null;
        }
    }
}