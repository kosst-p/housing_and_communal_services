import { SortOrder } from '../../../services/types';

export interface IServiceProviderQueryParamsOptions {
    search: string,
    sort: {
        [key: string]: SortOrder
    },
    limit: number,
    skip: number
}

export interface IServiceProviderFull {
    id: string,
    name: string
}

export interface IServiceProviderPaginateResult {
    docs: IServiceProviderFull[],
    totalDocs: number;
    limit: number;
    page?: number | undefined;
    totalPages: number;
    offset: number;
}
