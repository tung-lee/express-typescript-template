import { Model, ObjectId } from 'mongoose';
import { MongooseFindManyOptions } from '@/repository/type';

// Base Repository Interface for MongoDB
interface BaseRepository<T> {
    // CREATE
    create(data: Partial<T>): Promise<T>;
    createMany(listData: Partial<T>[]): Promise<T[]>;

    // READ
    findMany(options?: MongooseFindManyOptions): Promise<T[]>;
    findById(id: string | ObjectId): Promise<T | null>;
    // findOne()
    // findOneScopes()
    // findPage()

    // UPDATE
    update(id: string | ObjectId, data: Partial<T>): Promise<T | null>;
    // updateMany()

    // DELETE
    deleteById(id: string | ObjectId): Promise<boolean>;
    // deleteMany()
}

// Base Repository Implementation
abstract class BaseRepositoryImpl<T> implements BaseRepository<T> {
    model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        try {
            const created = await this.model.create(data);
            return created;
        } catch (error) {
            console.error('Error creating document:', error);
            throw error;
        }
    }

    async createMany(listData: Partial<T>[]): Promise<T[]> {
        try {
            const listCreated = await this.model.create(listData);
            return listCreated;
        } catch (error) {
            console.error('Error creating documents:', error);
            throw error;
        }
    }

    async findMany(options?: MongooseFindManyOptions): Promise<T[]> {
        try {
            let query = this.model.find();

            if (options?.selectFields) {
                query = query.select(options.selectFields);
            }
            if (options?.sort) {
                query = query.sort(options.sort);
            }
            if (options?.offset) {
                query = query.skip(options.offset);
            }
            if (options?.limit) {
                query = query.limit(options.limit);
            }
            if (options?.populateOptions) {
                query = query.populate(options.populateOptions);
            }

            const listData = await query.exec();
            return listData;
        } catch (error) {
            console.error('Error finding documents:', error);
            throw error;
        }
    }

    async findById(id: string | ObjectId): Promise<T | null> {
        try {
            const data = await this.model.findById(id).exec();
            return data;
        } catch (error) {
            console.error('Error finding document by id:', error);
            throw error;
        }
    }

    async update(id: string | ObjectId, data: Partial<T>): Promise<T | null> {
        try {
            const updated = await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
            return updated;
        } catch (error) {
            console.error('Error updating document:', error);
            throw error;
        }
    }

    async deleteById(id: string | ObjectId): Promise<boolean> {
        try {
            const result = await this.model.findByIdAndDelete(id).exec();
            return result !== null;
        } catch (error) {
            console.error('Error deleting document:', error);
            throw error;
        }
    }
}

export { BaseRepository, BaseRepositoryImpl }
