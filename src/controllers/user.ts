import { CreateUserRequest } from "@/dto";
import { CustomExpress } from "@/pkg/app/response";
import { ErrorCode } from "@/pkg/e/code";
import { prepareSelectedFieldValue } from "@/pkg/utils/utils";
import { MongooseFindManyOptions } from "@/repository/type";
import { userService } from "@/services"
import { User } from "@/types";
import { RequestHandler } from "express";

const create: RequestHandler = async (req, res, next) => {
    const appExpress = new CustomExpress(req, res, next);

    try {
        let data = appExpress.req.body as CreateUserRequest;
        let user: User = {
            ...data,
        }
        const result = await userService.create(user);
        appExpress.response201(result)
    } catch (error) {
        next(error);
    }
};

const findMany: RequestHandler = async (req, res, next) => {
    const appExpress = new CustomExpress(req, res, next);

    try {
        const selectFields = prepareSelectedFieldValue(appExpress.req.query.select as string);

        const options: MongooseFindManyOptions = {
            selectFields,
        }

        const users = await userService.findMany(options);
        appExpress.response200(users)
    } catch (error) {
        next(error);
    }
};


const findById: RequestHandler = async (req, res, next) => {
    const appExpress = new CustomExpress(req, res, next);

    try {
        const user = await userService.findById(req.params.id);
        if (!user) {
            appExpress.response404(ErrorCode.USER_NOT_FOUND, {})
        } else {
            appExpress.response200(user)
        }
    } catch (error) {
        next(error);
    }
};

const update: RequestHandler = async (req, res, next) => {
    const appExpress = new CustomExpress(req, res, next);

    try {
        const user = await userService.update(req.params.id, req.body);
        if (!user) {
            appExpress.response404(ErrorCode.USER_NOT_FOUND, {})
        } else {
            appExpress.response200(user)
        }
    } catch (error) {
        next(error);
    }
};

const deleteById: RequestHandler = async (req, res, next) => {
    const appExpress = new CustomExpress(req, res, next);

    try {
        await userService.deleteById(req.params.id);
        appExpress.response204({})
    } catch (error) {
        next(error);
    }
};

const userController = {
    create,
    findMany,
    findById,
    update,
    deleteById,
};

export { userController };
