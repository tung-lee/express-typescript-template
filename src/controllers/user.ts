import { CreateUserRequest } from "@/dto";
import { userService } from "@/services"
import { User } from "@/types";
import { RequestHandler } from "express";

const create: RequestHandler = async (req, res, next) => {
    try {
        let data = req.body as CreateUserRequest;
        let user: User = {
            ...data,
        }
        const result = await userService.create(user);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const findMany: RequestHandler = async (req, res, next) => {
    try {
        const users = await userService.findMany();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};


const findById: RequestHandler = async (req, res, next) => {
    try {
        const user = await userService.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const update: RequestHandler = async (req, res, next) => {
    try {
        const user = await userService.update(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const deleteById: RequestHandler = async (req, res, next) => {
    try {
        await userService.deleteById(req.params.id);
        res.status(204).send();
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
