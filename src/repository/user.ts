import { BaseRepositoryImpl, BaseRepository } from "@/repository";
import { userModel } from "@/models";
import { User } from "@/types";

interface UserRepository extends BaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;
}

class UserRepositoryImpl extends BaseRepositoryImpl<User> implements UserRepository {
    constructor() {
        super(userModel);
    }

    // need to implement in generic way
    findByEmail(email: string): Promise<User | null> {
        return this.model.findOne({ email }).exec();
    }
}

export { UserRepository, UserRepositoryImpl };