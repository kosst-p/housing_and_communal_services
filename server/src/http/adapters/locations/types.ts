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
    totalDocs: number,
    limit: number,
    page?: number | undefined
}

export interface ILocationServiceProviderFull {
    id: string,
    locationId: string,
    serviceProviderId: string,
}
