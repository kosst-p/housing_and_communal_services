import { Request, Response, NextFunction } from 'express';

export interface ILocationPostData {
    userId: string,
    country: string,
    region: string,
    city: string,
    address: string,
    houseNumber: string,
}

export interface ILocationPathData {
    country?: string,
    region?: string,
    city?: string,
    address?: string,
    houseNumber?: string,
}

export type TRequestPost = Request<never, never, ILocationPostData>;

export interface IRequestPath extends Request {
    body: ILocationPathData
}

export { Request }; // remove

export { Response };

export { NextFunction };
