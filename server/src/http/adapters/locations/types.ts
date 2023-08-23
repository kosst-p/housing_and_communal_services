import { SortOrder } from '../../../services/types';

export interface ILocationQueryParamsOptions {
    search: string,
    sort: {
        [key: string]: SortOrder
    },
    count: number,
    skip: number
}
