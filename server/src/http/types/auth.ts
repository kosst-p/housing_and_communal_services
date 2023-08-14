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

export type TLoginRequest = Request<never, never, ILoginData>;

export type TRegistrationRequest = Request<never, never, IRegistrationData>;

export { Response };

export { NextFunction };
