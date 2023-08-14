import { Request, Response, NextFunction } from 'express';

export interface ILocationPostData {
    country: string,
    region: string,
    city: string,
    address: string,
    house_number: string,
}

export type TRequestGet = Request<{ id: string }> & {
    params: { id: string };
};

export type TRequestPost = Request<never, never, ILocationPostData>;

export { Request };

export { Response };

export { NextFunction };


// ---
export interface ILocationDto {
    // id ?
    country: string,
    region: string,
    city: string,
    address: string,
    house_number: string,
}

export interface ILocation {
    // id ?
    country: string,
    region: string,
    city: string,
    address: string,
    house_number: string,
}
