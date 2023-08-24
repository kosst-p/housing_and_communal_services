import { SortOrder } from '../../../services/types';

export interface ILocationQueryParamsOptions {
    search: string,
    sort: {
        [key: string]: SortOrder
    },
    limit: number,
    skip: number
}

export interface ILocationFull {
    id: string,
    country: string,
    region: string,
    city: string,
    address: string,
    houseNumber: string
}
export interface ILocationPaginateResult {
    docs: ILocationFull[],
    totalDocs: number;
    limit: number;
    page?: number | undefined;
    totalPages: number;
    offset: number;
}
