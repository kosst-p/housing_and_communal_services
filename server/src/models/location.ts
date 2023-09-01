import mongoosePaginate from 'mongoose-paginate-v2';

import { ObjectId, Document, SortOrder, PaginateModel, FilterQuery } from '@services/types';
import DBService from '@services/dbService';

export interface ILocation {
    userId: typeof ObjectId,
    country: string,
    region: string,
    city: string,
    address: string,
    houseNumber: string
}

export interface ILocationCreate {
    country?: string,
    region?: string,
    city?: string,
    address: string,
    houseNumber?: string
}

export interface ILocationUpdate {
    country?: string,
    region?: string,
    city?: string,
    address?: string,
    houseNumber?: string
}

export interface ILocationDocument extends ILocation, Document {
    fullName: string
}

export interface ILocationQueryParams {
    search: string,
    sort: {
        [ key: string ]: SortOrder
    },
    limit: number,
    skip: number
}

export interface ILocationFilterQuery extends FilterQuery<ILocation> {}

const schema = DBService.getSchema<ILocationDocument>(
    {
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        country: {
            type: String,
        },
        region: {
            type: String,
        },
        city: {
            type: String,
        },
        address: {
            type: String,
            required: true,
        },
        houseNumber: {
            type: String,
        },
    },
    // { timestamps: true }
);

schema.set( 'toJSON', { virtuals: true } );
schema.virtual( 'fullName' ).get( function () {
    return [ this.country, this.region, this.city, this.address, this.houseNumber ].filter( Boolean ).join( ', ' );
} );

export default DBService.getModel<ILocationDocument, PaginateModel<ILocationDocument>>( 'Location', schema.plugin( mongoosePaginate ) );
