import { SortOrder } from '../../../services/types';

export interface IServiceProviderQueryParamsOptions {
    search: string,
    sort: {
        [key: string]: SortOrder
    },
    count: number,
    skip: number
}
