import dotenv from "dotenv"
import path from "path"
import { DBMode } from "../repository/Repository.factory"

// we can use dotenv.config() without specifiying the location of env file but this is safer
dotenv.config({path: path.join(__dirname, "../../.env")})

export default {
    isDev: process.env.NODE_ENV === 'development', 
    logDir: process.env.LOG_DIR || './logs', // Specifies the folder where log files will be saved.
    storagePath: {
        csv: {
            cake: "src/data/cake orders.csv"
        },
        sqlite: "src/data/orders.db",
    },
    postgreURL: `postgresql://neondb_owner:${process.env.NEON_PASS}@ep-silent-bird-a259sdjj-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require`,
    port: process.env.PORT || "3000",
    host: process.env.HOST || "localhost",
    dbMode: DBMode.SQLITE,
}