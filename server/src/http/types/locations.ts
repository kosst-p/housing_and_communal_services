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

export interface IRequestGet extends Request {
    query: {
        search?: string, // search
        page?: string, // pagination
        sort?: string, // page
        count?: string // count of records
    }
}

export interface ILocationQueryParamsOptions {
    userId: string,
    search?: string,
    page: number,
    sort?: string,
    count: number
}

export { Request }; // remove

export { Response };

export { NextFunction };
