import { ILocationCreate, ILocationUpdate, ILocationQueryParamsOptions, ILocationPaginate } from '@models/location';
import { IUserAuth } from '@models/user';
import { locationRepository } from '@repositories/index';
import { NotFoundError, ForbiddenError } from '@errors/index';

export default class Actions {
    async getById( user: IUserAuth, id: string ) {
        const item = await locationRepository.getById( id );

        if ( ! item ) {
            throw new NotFoundError();
        }

        if ( item.userId.toString() !== user.id ) {
            throw new ForbiddenError();
        }

        return item;
    }

    async paginate( user: IUserAuth, options: ILocationQueryParamsOptions ) {
        const data: ILocationPaginate = {
            userId: user.id,
            ...options,
        };

        return await locationRepository.paginate( data );
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
