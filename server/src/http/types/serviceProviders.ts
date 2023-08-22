import { Request } from './index';

export interface IServiceProviderPostData {
    name: string
}

export interface IRequestPost extends Request {
    body: IServiceProviderPostData
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
