import { Request } from './index';

export interface ILocationPostData {
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

export interface ILocationServiceProviderPostData {
    id: string
}

export interface IRequestPost extends Request {
    body: ILocationPostData
}

export interface IRequestPath extends Request {
    body: ILocationPathData
}

export interface IRequestPostLocationServiceProvider extends Request {
    body: ILocationServiceProviderPostData
}

export interface IRequestDeleteLocationServiceProvider extends Request {
    params: {
        id: string,
        attachedServiceProviderId: string
    }
}
export interface IRequestGet extends Request {
    query: {
        search?: string,
        page?: string,
        sort?: string,
        limit?: string
    }
}
