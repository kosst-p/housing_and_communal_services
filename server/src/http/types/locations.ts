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

export interface IRequestPost extends Request {
    body: ILocationPostData
}

export interface IRequestPath extends Request {
    body: ILocationPathData
}

export interface IRequestGet extends Request {
    query: {
        search?: string,
        page?: string,
        sort?: string,
        count?: string
    }
}

export { Request };

export { Response };

export { NextFunction };
