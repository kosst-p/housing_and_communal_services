import { Request, Response, NextFunction } from 'express';

export interface ILocationPostData {
    userId: string,
    country: string,
    region: string,
    city: string,
    address: string,
    houseNumber: string,
}

export type TRequestGet = Request<{ id: string }> & {
    params: { id: string };
}; // check

export type TRequestPost = Request<never, never, ILocationPostData>;

export { Request };

export { Response };

export { NextFunction };
