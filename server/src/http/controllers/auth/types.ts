import { Request, Response, NextFunction } from 'express';

interface ILoginData {
    name: string,
    password: string
}

interface IRegistrationData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface ILoginRequest extends Request {
    body: ILoginData;
}
export interface IRegistrationRequest extends Request {
    body: IRegistrationData;
}
export type TResponse = Response;
export type TNextFunction = NextFunction;
