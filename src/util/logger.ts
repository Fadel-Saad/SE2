import config from "../config";
import winston from "winston";

const { logDir, isDev } = config;

// Define log formats
const logFileFormat = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.splat(),
	winston.format.errors({ stack: true }),
	winston.format.json()
);

// Define console log format
const logConsoleFormat = winston.format.combine(
	winston.format.colorize(),
	winston.format.timestamp({ format: 'HH:mm:ss' }),
	winston.format.splat(), // used to show the content of objects
	winston.format.printf(({ timestamp, level, message, stack }) => {
    return `[${timestamp}] ${level}: ${message}\n${stack || ""}`
    })
);

const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.File({ filename: "error.log", dirname: logDir, level: "error", format: logFileFormat}),
        new winston.transports.File({ filename: "all.log", dirname: logDir, format: logFileFormat}),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: "exceptions.log", dirname: logDir})
    ]
})

// Only log to console when in dev mode
if(isDev) {
    logger.add(new winston.transports.Console({ format: logConsoleFormat }));
    logger.level = "debug";
}

export default logger;