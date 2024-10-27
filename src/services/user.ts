import { AppError } from "@/pkg/e/app_error";
import { ErrorCode } from "@/pkg/e/code";
import { UserRepository, UserRepositoryImpl } from "@/repository";
import { MongooseFindManyOptions } from "@/repository/type";
import { BaseService } from "@/services";
import { User } from "@/types";

interface UserService extends BaseService<User, string> {
    findByEmail(email: string): Promise<User | null>;
}

class UserServiceImpl implements UserService {
    userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepositoryImpl();
    }

    // CREATE
    async create(data: User): Promise<User> {
        try {
            return await this.userRepository.create(data);
        } catch (error) {
            console.error('Error creating user:', error);

            throw AppError.newError500(ErrorCode.CREATE_USER_FAILED, "create user error: " + (error as Error).message);
        }
    }

    async createMany(data: User[]): Promise<User[]> {
        try {
            return await this.userRepository.createMany(data);
        } catch (error) {
            console.error('Error creating multiple users:', error);
            throw AppError.newError500(ErrorCode.CREATE_USER_FAILED, "create multiple users error: " + (error as Error).message);
        }
    }

    // READ
    async findMany(options?: MongooseFindManyOptions): Promise<User[]> {
        try {
            return await this.userRepository.findMany(options);
        } catch (error) {
            console.error('Error finding users:', error);

            throw AppError.newError500(ErrorCode.FIND_USER_FAILED, (error as Error).message);
        }
    }

    async findById(id: string): Promise<User | null> {
        try {
            return await this.userRepository.findById(id);
        } catch (error) {
            console.error(`Error finding user by ID ${id}:`, error);
            throw AppError.newError500(ErrorCode.FIND_USER_FAILED, (error as Error).message);
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            return await this.userRepository.findByEmail(email);
        } catch (error) {
            console.error(`Error finding user by email ${email}:`, error);
            throw AppError.newError500(ErrorCode.FIND_USER_BY_EMAIL_FAILED, (error as Error).message);
        }
    }

    // UPDATE
    async update(id: string, data: Partial<User>): Promise<User | null> {
        try {
            return await this.userRepository.update(id, data);
        } catch (error) {
            console.error(`Error updating user ${id}:`, error);
            throw AppError.newError500(ErrorCode.UPDATE_USER_FAILED, (error as Error).message);
        }
    }

    // DELETE
    async deleteById(id: string): Promise<boolean> {
        try {
            return await this.userRepository.deleteById(id);
        } catch (error) {
            console.error(`Error deleting user ${id}:`, error);
            throw AppError.newError500(ErrorCode.DELETE_USER_FAILED, (error as Error).message);
        }
    }

    // OTHER
}

// should use Dependency Injection
const userService = new UserServiceImpl();

export { userService };
