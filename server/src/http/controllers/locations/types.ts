import { Request, Response, NextFunction } from 'express';

export interface ILocationGet {
    id: string
}
export interface ILocationPost {
    country: string,
    region: string,
    city: string,
    address: string,
    house_number: string,
}
export interface IRequestGet extends Request {
    params: ILocationGet & Record<string, string>;
}
export interface IRequestPost extends Request {
    body: ILocationPost;
}
export type TRequestGet = IRequestGet;
export type TRequestPost = IRequestPost;
export type TResponse = Response;
export type TNextFunction = NextFunction;
