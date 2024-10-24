export enum Role {
    NORMAL = "normal",
    ADMIN = "admin",
    INTERNAL = "internal",
}

export interface User {
    userId?: string;
    username: string;
    email: string;
    role?: Role;
}

export interface SimpleUser {

}