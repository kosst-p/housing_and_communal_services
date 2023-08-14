import DBService from '../services/dbService';
import { ObjectId } from '../services/types';

interface ILocation {
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

const schema = DBService.getSchema<ILocation>( {
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
} );

export default DBService.getModel<ILocation>( 'Location', schema );
