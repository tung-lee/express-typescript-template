import compression from "compression";
import express, { Request, Response, Express, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import cors from "cors";

import router from "./routes";
import { ErrorResponse, NotFoundError } from "./core/error.response";

// Load environment variables before importing other modules that use them
require("dotenv").config();

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
  const notFoundError = new NotFoundError();
  next(notFoundError);
});

app.use(
  (err: ErrorResponse, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(statusCode).json({
      status: "error",
      code: statusCode,
      message: err.message || "Internal Server Error",
      // stack: err.stack, // development only
    });
  }
);

export default app;
