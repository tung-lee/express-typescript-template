import compression from "compression";
import express, { Request, Response, Express, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

import router from "@/routes";
import { AppError } from "@/pkg/e/app_error";
import { ErrorCode } from "@/pkg/e/code";
import { ErrorMessages } from "@/pkg/e/msg";
import { CustomExpress } from "@/pkg/app/response";
import { logger } from "@/pkg/log/logger";
import { Header } from "@/types/request/header";


import "@/config";

const app: Express = express();

// init middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const requestId = req.headers[Header.X_REQUEST_ID] as string || uuidv4();
    req.requestId = requestId;
    logger.info(`input params ::${req.method}::`, {
        metadata: req.method === 'POST' ? req.body : req.query,
        requestId,
        context: req.path,
    });
    next();
});

// init db
import "./db/mongodb_connection";

// init routes
app.use("", router);

// handling errors

// 404 Not Found
app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(AppError.newError404(ErrorCode.NOT_FOUND, ErrorMessages[ErrorCode.NOT_FOUND]));
});

app.use(
    (err: AppError, req: Request, res: Response, _next: NextFunction) => {
        const errorResponseMsg = `${err.errCode} - ${Date.now()}ms - Response - ${JSON.stringify(err)}`;
        logger.error(errorResponseMsg, {
            metadata: { message: err.msg },
            requestId: req.requestId,
            context: req.path,
        });
        const appExpress = new CustomExpress(req, res, _next);
        appExpress.responseAppError(err);
    }
);

export default app;
