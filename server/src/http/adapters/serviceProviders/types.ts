export interface IServiceProviderFull {
    id: string,
    name: string
}

export interface IServiceProviderPaginateResult {
    docs: IServiceProviderFull[],
    totalDocs: number,
    limit: number,
    page?: number | undefined
}
