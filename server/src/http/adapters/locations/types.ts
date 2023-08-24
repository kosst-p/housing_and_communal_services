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
}
