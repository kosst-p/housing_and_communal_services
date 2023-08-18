import { SortOrder } from '../../../services/types';

export interface ILocationQueryParamsOptions {
    userId: string,
    search: string,
    sort: {
        [key: string]: SortOrder
    },
    count: number,
    skip: number
}
