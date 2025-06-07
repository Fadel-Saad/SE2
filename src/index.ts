import config from "./config";
import express, { NextFunction, Request, Response } from "express";
import logger from "./util/logger";
import helmet from "helmet";
import bodyParser from "body-parser"
import cors from "cors";
import requestLogger from "./middleware/requestLogger";
import routes from "./routes";
import { ApiException } from "./util/exceptions/ApiException";

const app = express();

// config helmet
app.use(helmet());

// config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// config cors
app.use(cors());

// add middlewares
app.use(requestLogger)

// config routes
app.use("/", routes);

// config 404 handler
app.use((req, res) => {
    res.status(404).json({error: "Not Found"});
});

// config error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiException) {
        logger.error("API Exception of status %d: %s", err.status, err.message);
        res.status(err.status).json({error: err.message});
    } else {
        logger.error("Unhandled Error: %s", err.message);
        res.status(500).json({ error: "Internal Server Error "});
    }
})

app.listen(Number(config.port), config.host, () => {
    logger.info("Server is running on http://%s:%d", config.host, config.port);
});