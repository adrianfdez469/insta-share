
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum FILE_STATUS {
    UPLOADED = "UPLOADED",
    COMPRESSING = "COMPRESSING",
    COMPRESSED = "COMPRESSED"
}

export interface IResponse {
    code: string;
    success: boolean;
    message: string;
}

export class File {
    __typename?: 'File';
    id: string;
    name: string;
    status: FILE_STATUS;
    size: number;
    zipped_size?: Nullable<number>;
    url?: Nullable<string>;
    user: string;
}

export class UpdateFileResponse implements IResponse {
    __typename?: 'UpdateFileResponse';
    code: string;
    success: boolean;
    message: string;
    data?: Nullable<File>;
}

export class DeleteFileResponse implements IResponse {
    __typename?: 'DeleteFileResponse';
    code: string;
    success: boolean;
    message: string;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract getFiles(user: string): Nullable<File>[] | Promise<Nullable<File>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract getUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract deleteFile(id: string): DeleteFileResponse | Promise<DeleteFileResponse>;

    abstract deleteAllFiles(): DeleteFileResponse | Promise<DeleteFileResponse>;

    abstract updateFile(id: string, name?: Nullable<string>): UpdateFileResponse | Promise<UpdateFileResponse>;

    abstract createUser(email: string, password: string): Nullable<CreateUserResponse> | Promise<Nullable<CreateUserResponse>>;

    abstract deleteUser(id: string): Nullable<DeleteUserResponse> | Promise<Nullable<DeleteUserResponse>>;

    abstract loginUser(email: string, password: string): Nullable<LoginUserResponse> | Promise<Nullable<LoginUserResponse>>;
}

export abstract class ISubscription {
    __typename?: 'ISubscription';

    abstract fileChanged(userId: string): File | Promise<File>;
}

export class User {
    __typename?: 'User';
    id: string;
    email?: Nullable<string>;
    password?: Nullable<string>;
    files?: Nullable<Nullable<File>[]>;
}

export class CreateUserResponse implements IResponse {
    __typename?: 'CreateUserResponse';
    code: string;
    success: boolean;
    message: string;
    data?: Nullable<User>;
}

export class DeleteUserResponse implements IResponse {
    __typename?: 'DeleteUserResponse';
    code: string;
    success: boolean;
    message: string;
}

export class LoginUserData {
    __typename?: 'LoginUserData';
    id: string;
    email: string;
    token: string;
    exp: number;
}

export class LoginUserResponse implements IResponse {
    __typename?: 'LoginUserResponse';
    code: string;
    success: boolean;
    message: string;
    data?: Nullable<LoginUserData>;
}

type Nullable<T> = T | null;
