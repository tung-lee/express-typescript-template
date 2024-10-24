import { userService } from "@/services/user";

interface BaseService<T, K> {
    // CREATE
    create: (data: T) => Promise<T>;
    createMany: (data: T[]) => Promise<T[]>;

    // READ
    findMany: () => Promise<T[]>;
    findById: (id: K) => Promise<T | null>;

    // UPDATE
    update: (id: K, data: Partial<T>) => Promise<T | null>;

    // DELETE
    deleteById: (id: K) => Promise<boolean>;

    // OTHER
}

export { BaseService, userService };
