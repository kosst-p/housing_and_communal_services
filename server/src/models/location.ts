import mongoosePaginate from 'mongoose-paginate-v2';

import DBService from '../services/dbService';
import { ObjectId, Document, SortOrder, PaginateModel } from '../services/types';

export interface ILocation {
    userId: typeof ObjectId,
    country: string,
    region: string,
    city: string,
    address: string,
    houseNumber: string
}

export interface ILocationCreate {
    userId: string,
    country: string,
    region: string,
    city: string,
    address: string,
    houseNumber: string
}

export interface ILocationUpdate {
    country?: string,
    region?: string,
    city?: string,
    address?: string,
    houseNumber?: string
}

export type TLocation = Document & ILocation;

export interface ILocationQueryParamsOptions {
    search: string,
    sort: {
        [ key: string ]: SortOrder
    },
    limit: number,
    skip: number
}
export interface ILocationPaginate extends ILocationQueryParamsOptions {
    userId: string
}

const schema = DBService.getSchema<ILocation>(
    {
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        region: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        houseNumber: {
            type: String,
            required: true,
        },
    },
    // { timestamps: true }
);

export default DBService.getModel<ILocation, PaginateModel<ILocation>>( 'Location', schema.plugin( mongoosePaginate ) );
