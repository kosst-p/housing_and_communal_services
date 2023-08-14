import { Request, Response, NextFunction } from 'express';

export interface IUserDto {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface IUserGetData {
    id: string
}

export type TRequestGet = Request<IUserGetData & Record<string, string>>

export { Request };

export { Response };

export { NextFunction };
