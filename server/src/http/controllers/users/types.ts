import { Request, Response, NextFunction } from 'express';

export interface IUserGet {
    id: string
}
export interface IRequestGet extends Request {
    params: IUserGet & Record<string, string>;
}

export type TRequestGet = IRequestGet;
export type TResponse = Response;
export type TNextFunction = NextFunction;
