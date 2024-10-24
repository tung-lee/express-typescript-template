import { UserRepository, UserRepositoryImpl } from "@/repository";
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
            throw error;
        }
    }

    async createMany(data: User[]): Promise<User[]> {
        try {
            return await this.userRepository.createMany(data);
        } catch (error) {
            console.error('Error creating multiple users:', error);
            throw error;
        }
    }

    // READ
    async findMany(): Promise<User[]> {
        try {
            return await this.userRepository.findMany();
        } catch (error) {
            console.error('Error finding users:', error);
            throw error;
        }
    }

    async findById(id: string): Promise<User | null> {
        try {
            return await this.userRepository.findById(id);
        } catch (error) {
            console.error(`Error finding user by ID ${id}:`, error);
            throw error;
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            return await this.userRepository.findByEmail(email);
        } catch (error) {
            console.error(`Error finding user by email ${email}:`, error);
            throw error;
        }
    }

    // UPDATE
    async update(id: string, data: Partial<User>): Promise<User | null> {
        try {
            return await this.userRepository.update(id, data);
        } catch (error) {
            console.error(`Error updating user ${id}:`, error);
            throw error;
        }
    }

    // DELETE
    async deleteById(id: string): Promise<boolean> {
        try {
            return await this.userRepository.deleteById(id);
        } catch (error) {
            console.error(`Error deleting user ${id}:`, error);
            throw error;
        }
    }

    // OTHER
}

// should use Dependency Injection
const userService = new UserServiceImpl();

export { userService };
