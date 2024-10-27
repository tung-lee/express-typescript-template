// Error return from service layer

import { StatusCodes } from "http-status-codes";

import { ErrorCode } from "@/pkg/e/code";

// interface IAppErrorFactory {
//     newError(errCode: ErrorCode, httpCode: StatusCodes, msg: string): AppError;
//     newError400(errCode: ErrorCode, msg: string): AppError;
//     newError403(errCode: ErrorCode, msg: string): AppError;
//     newError404(errCode: ErrorCode, msg: string): AppError;
//     newError500(errCode: ErrorCode, msg: string): AppError;
//     newError502(errCode: ErrorCode, msg: string): AppError;

//     newRootError400(errCode: ErrorCode, msg: string, root: Error): AppError;
//     newRootError403(errCode: ErrorCode, msg: string, root: Error): AppError;
//     newRootError404(errCode: ErrorCode, msg: string, root: Error): AppError;
//     newRootError500(errCode: ErrorCode, msg: string, root: Error): AppError;
//     newRootError502(errCode: ErrorCode, msg: string, root: Error): AppError;
// }

export class AppError {
    msg: string;
    errCode?: ErrorCode;
    statusCode: StatusCodes;
    root?: Error;

    constructor(msg: string, statusCode: StatusCodes, errCode?: ErrorCode, root?: Error) {
        this.msg = msg;
        this.errCode = errCode;
        this.statusCode = statusCode;
        this.root = root;
    }

    static newError(errCode: number, httpCode: StatusCodes, msg: string): AppError {
        return new AppError(msg, httpCode, errCode)
    }

    static newError400(errCode: ErrorCode, msg: string): AppError {
        return new AppError(msg, StatusCodes.BAD_REQUEST, errCode)
    }

    static newError403(errCode: ErrorCode, msg: string): AppError {
        return new AppError(msg, StatusCodes.FORBIDDEN, errCode)
    }

    static newError404(errCode: ErrorCode, msg: string): AppError {
        return new AppError(msg, StatusCodes.NOT_FOUND, errCode)
    }

    static newError500(errCode: ErrorCode, msg: string): AppError {
        return new AppError(msg, StatusCodes.INTERNAL_SERVER_ERROR, errCode)
    }

    static newError502(errCode: ErrorCode, msg: string): AppError {
        return new AppError(msg, StatusCodes.BAD_GATEWAY, errCode)
    }

    static newRootError400(errCode: ErrorCode, msg: string, root: Error): AppError {
        return new AppError(msg, StatusCodes.BAD_REQUEST, errCode, root)
    }

    static newRootError403(errCode: ErrorCode, msg: string, root: Error): AppError {
        return new AppError(msg, StatusCodes.FORBIDDEN, errCode, root)
    }

    static newRootError404(errCode: ErrorCode, msg: string, root: Error): AppError {
        return new AppError(msg, StatusCodes.NOT_FOUND, errCode, root)
    }

    static newRootError500(errCode: ErrorCode, msg: string, root: Error): AppError {
        return new AppError(msg, StatusCodes.INTERNAL_SERVER_ERROR, errCode, root)
    }

    static newRootError502(errCode: ErrorCode, msg: string, root: Error): AppError {
        return new AppError(msg, StatusCodes.BAD_GATEWAY, errCode, root)
    }
}



