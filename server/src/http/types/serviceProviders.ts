import { Request } from './index';

export interface IServiceProviderPostData {
    name: string
}

export interface IServiceProviderPathData {
    name?: string
}

export interface IRequestPost extends Request {
    body: IServiceProviderPostData
}

export interface IRequestPath extends Request {
    body: IServiceProviderPathData
}

export interface IRequestGet extends Request {
    query: {
        search?: string,
        page?: string,
        sort?: string,
        limit?: string
    }
}
