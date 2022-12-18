
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IResponse {
    code: string;
    success: boolean;
    message: string;
}

export class File {
    __typename?: 'File';
    id: string;
    name: string;
    status: string;
    size: number;
    url?: Nullable<string>;
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

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract getUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createUser(email: string, password: string): Nullable<CreateUserResponse> | Promise<Nullable<CreateUserResponse>>;

    abstract deleteUser(id: string): Nullable<DeleteUserResponse> | Promise<Nullable<DeleteUserResponse>>;

    abstract loginUser(email: string, password: string): Nullable<LoginUserResponse> | Promise<Nullable<LoginUserResponse>>;
}

type Nullable<T> = T | null;
