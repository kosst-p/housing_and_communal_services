import { Request } from './index';

export interface ITransactionPostData {
    locationServiceProviderId: string,
    date: Date,
    price: number
}

export interface ITransactionPathData {
    date?: Date,
    price?: number
}

export interface IRequestPost extends Request {
    body: ITransactionPostData
}

export interface IRequestPath extends Request {
    body: ITransactionPathData
}
