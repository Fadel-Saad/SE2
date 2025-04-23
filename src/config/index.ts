import dotenv from "dotenv"
import path from "path"

// we can use dotenv.config() without specifiying the location of env file but this is safer
dotenv.config({path: path.join(__dirname, "../../.env")})

export default {
    isDev: process.env.NODE_ENV === 'development', 
    logDir: process.env.LOG_DIR || './logs', // Specifies the folder where log files will be saved.
}