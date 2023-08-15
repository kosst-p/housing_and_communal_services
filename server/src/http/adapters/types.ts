export interface IUserFromBody {
    name: string,
    email: string,
    password: string,
}

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

