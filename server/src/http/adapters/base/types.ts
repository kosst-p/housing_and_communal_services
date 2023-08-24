import { Request } from '../../types/index';
import { SortOrder } from '../../../services/types';

export interface IRequestGet extends Request {
    query: {
        search?: string,
        page?: string,
        sort?: string,
        limit?: string
    }
}

export type TSortOrderValue = SortOrder;

export interface ISortParam {
    [ key: string ]: TSortOrderValue
}
