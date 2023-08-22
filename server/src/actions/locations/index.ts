import { ILocationCreate, ILocationUpdate, ILocationQueryParamsOptions } from '@models/location';
import { IUserAuth } from '@models/user';
import { locationRepository } from '@repositories/index';
import { NotFoundError, ForbiddenError } from '@errors/index';

export default class Actions {
    async getById( user: IUserAuth, locationId: string ) {
        const location = await locationRepository.getById( locationId );

        if ( ! location ) {
            throw new NotFoundError();
        }

        if ( location.userId.toString() !== user.id ) {
            throw new ForbiddenError();
        }

        return location;
    }

    async get( options: ILocationQueryParamsOptions ) {
        return await locationRepository.get( options );
    }

    async create( data: ILocationCreate ) {
        return await locationRepository.create( data );
    }

    async update( id: string, data: ILocationUpdate ) {
        return await locationRepository.update( id, data );
    }

    async delete( id: string ) {
        return await locationRepository.delete( id );
    }
}
