import { model, Schema } from "mongoose";
import { Role, User } from "@/types";

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

const schema = new Schema<User>(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: [Role.NORMAL, Role.ADMIN, Role.INTERNAL],
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

export default model<User>(DOCUMENT_NAME, schema);