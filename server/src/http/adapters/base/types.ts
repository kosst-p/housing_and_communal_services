import { SortOrder } from '../../../services/types';

export type TSortOrderValue = SortOrder;

export interface ISortParam {
    [ key: string ]: TSortOrderValue
}
