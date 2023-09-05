import { Request } from './index';

export interface ITransactionPostData {
    locationServiceProviderId: string,
    date: string,
    price: number
}

export interface ITransactionPathData {
    date?: string,
    price?: number
}

export interface IRequestPost extends Request {
    body: ITransactionPostData
}

export interface IRequestPath extends Request {
    body: ITransactionPathData
}

export interface ParsedSheetData {
    __EMPTY: string,
    [key: string]: string | number
}
