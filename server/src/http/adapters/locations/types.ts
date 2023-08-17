export interface ILocationFromBody {
    userId: string,
    country: string,
    region: string,
    city: string,
    address: string,
    houseNumber: string,
}

export interface ILocationPartialFromBody {
    userId?: string,
    country?: string,
    region?: string,
    city?: string,
    address?: string,
    houseNumber?: string,
}

export interface ILocationQueryParams {
    search?: string,
    page?: string,
    sort?: string,
    count?: string
}

export interface ILocationQueryParamsOptions {
    userId: string,
    search?: string,
    page?: string,
    sort?: string,
    count: number,
    skip?: number
}
