import { ILocationCreate, ILocationUpdate, ILocationQueryParams } from '@models/location';
import { IUserAuth } from '@models/user';
import { locationRepository } from '@repositories/index';
import { NotFoundError, ForbiddenError } from '@errors/index';

export default class Actions {
    async getById( user: IUserAuth, id: string ) {
        const item = await locationRepository.getById( id );

        if ( ! item ) {
            throw new NotFoundError( 'Location is not exist.' );
        }

        if ( item.userId.toString() !== user.id ) {
            throw new ForbiddenError();
        }

        return item;
    }

    async paginate( user: IUserAuth, params: ILocationQueryParams ) {
        const updatedParams: ILocationQueryParams & { userId: string } = {
            userId: user.id,
            ...params,
        };

        return await locationRepository.paginate( updatedParams );
    }

    async create( user: IUserAuth, data: ILocationCreate ) {
        const updatedData: ILocationCreate & { userId: string } = {
            userId: user.id,
            ...data,
        };

        return await locationRepository.create( updatedData );
    }

    async update( id: string, data: ILocationUpdate ) {
        return await locationRepository.update( id, data );
    }

    async delete( id: string ) {
        return await locationRepository.delete( id );
    }

    async getAttachedServiceProvider( attachedServiceProviderId: string ) {
        const item = await locationRepository.getAttachedServiceProviderById( attachedServiceProviderId );

        if ( ! item ) {
            throw new NotFoundError( 'Attached ServiceProvider is not exist.' );
        }

        return item;
    }

    async attachServiceProvider( id: string, serviceProviderId: string ) {
        return await locationRepository.attachServiceProvider( id, serviceProviderId );
    }

    async detachServiceProvider( attachedServiceProviderId: string ) {
        return await locationRepository.detachServiceProvider( attachedServiceProviderId );
    }
}
