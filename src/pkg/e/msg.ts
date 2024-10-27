import { ErrorCode } from '@/pkg/e/code';

export const ErrorMessages: { [key in ErrorCode]: string } = {
    [ErrorCode.NOT_FOUND]: "Not Found",
    // Authentication & Authorization

    // User 30000-30999
    [ErrorCode.CREATE_USER_FAILED]: "Failed to create user",
    [ErrorCode.FIND_USER_FAILED]: "Failed to find user",
    [ErrorCode.USER_NOT_FOUND]: "User not found",
    [ErrorCode.UPDATE_USER_FAILED]: "Failed to update user",
    [ErrorCode.DELETE_USER_FAILED]: "Failed to delete user",
    [ErrorCode.FIND_USER_BY_EMAIL_FAILED]: "Failed to find user by email",
};
