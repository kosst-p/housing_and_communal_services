import { ILocationQueryParamsOptions, ILocationUpdate } from '../../models/location';
import { locationRepository } from '../../repositories/index';
import { IUserAuth } from '../../models/user';
import { NotFoundError, PermissionError } from '../../errors';

export default class Actions {
    async getById( user: IUserAuth, locationId: string ) {
        const location = await locationRepository.getById( locationId );

        if ( ! location ) {
            throw new NotFoundError();
        }

        if ( location.userId.toString() !== user.id ) {
            throw new PermissionError();
        }

        return location;
    }

    async get( options: ILocationQueryParamsOptions ) {
        return await locationRepository.get( options );
    }

    async update( id: string, data: ILocationUpdate ) {
        return await locationRepository.update( id, data );
    }
}
