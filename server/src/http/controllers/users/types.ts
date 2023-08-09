import { Request, Response, NextFunction } from 'express';

export interface IUserGet {
    id: string
}
export interface IUserPost {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}
export interface IUserPut {
    name: string,
    email: string,
}
export interface IRequestGet extends Request {
    params: IUserGet & Record<string, string>;
}
export interface IRequestPost extends Request {
    body: IUserPost;
}
export interface IRequestPut extends Request {
    body: IUserPut;
}
export type TRequestPost = IRequestPost;
export type TRequestGet = IRequestGet;
export type TRequestPut = IRequestPut;
export type TResponse = Response;
export type TNextFunction = NextFunction;
