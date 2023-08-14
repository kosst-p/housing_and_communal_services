import { Request, Response, NextFunction } from 'express';

export interface IUserGetData {
    id: string
}

export type TRequestGet = Request<IUserGetData & Record<string, string>> // check

export { Request };

export { Response };

export { NextFunction };
