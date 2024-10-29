import compression from "compression";
import express, { Request, Response, Express, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import router from "@/routes";
import { AppError } from "@/pkg/e/app_error";
import { ErrorCode } from "@/pkg/e/code";
import { ErrorMessages } from "@/pkg/e/msg";
import { CustomExpress } from "@/pkg/app/response";

import "@/config";

const app: Express = express();

// init middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
        const appExpress = new CustomExpress(_req, res, _next);
        appExpress.responseAppError(err);
    }
);

export default app;
