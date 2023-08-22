import { Request, Response, NextFunction } from 'express';

export interface IServiceProviderPostData {
    name: string
}

export interface IRequestPost extends Request {
    body: IServiceProviderPostData
}

export { Request };

export { Response };

export { NextFunction };
