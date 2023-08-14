import DBService from '../services/dbService';
import { ObjectId } from '../services/types';

// ilocationcreate, use in reposetories

interface ILocation {
    user: typeof ObjectId,
    country: string,
    region: string,
    city: string,
    address: string,
    house_number: string
}

const schema = DBService.getSchema<ILocation>( {
    user: {
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
    house_number: {
        type: String,
        required: true,
    },
} );

export default DBService.getModel<ILocation>( 'Location', schema );
