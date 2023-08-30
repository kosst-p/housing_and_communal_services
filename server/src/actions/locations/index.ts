import { ILocationCreate, ILocationUpdate, ILocationQueryParams, ILocationDocument } from '@models/location';
import { IUserAuth } from '@models/user';
import { IServiceProviderDocument } from '@/models/serviceProvider';
import { locationRepository, transactionRepository, userRepository } from '@repositories/index';
import { NotFoundError, ForbiddenError, RelationsError } from '@errors/index';

export default class Actions {
    async getById( user: IUserAuth, id: string ) {
        const item = await locationRepository.getById( id );

        if ( ! item ) {
            throw new NotFoundError( 'This Location doesn\'t exist.' );
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
        const location = await locationRepository.update( id, data );
        const attachedServiceProvider = await locationRepository.getAttachedServiceProvider( { locationId: id } );

        if ( attachedServiceProvider ) {
            await locationRepository.updateAttachedServiceProvider( attachedServiceProvider.id, { locationFullName: location.fullName } );
        }

        return location;
    }

    async delete( id: string ) {
        const attachedServiceProvider = await locationRepository.getAttachedServiceProvider( { locationId: id } );

        if ( attachedServiceProvider ) {
            throw new RelationsError( 'This Location has relations and cannot be removed.' );
        }

        return await locationRepository.delete( id );
    }

    async getAttachedServiceProviderById( user: IUserAuth, attachedServiceProviderId: string ) {
        const item = await locationRepository.getAttachedServiceProviderById( attachedServiceProviderId );

        if ( ! item ) {
            throw new NotFoundError( 'Attached Service Provider doesn\'t exist.' );
        }

        const currentUser = await userRepository.getById( user.id );

        if ( ! currentUser ) {
            throw new ForbiddenError();
        }

        return item;
    }

    async attachServiceProvider( location: ILocationDocument, serviceProvider: IServiceProviderDocument ) {
        const locationFullName = [ location.country, location.region, location.city, location.address, location.houseNumber ].filter( Boolean ).join( ', ' );

        return await locationRepository.attachServiceProvider( {
            locationId: location.id,
            locationFullName: locationFullName,
            serviceProviderId: serviceProvider.id,
            serviceProviderName: serviceProvider.name
        } );
    }

    async detachServiceProvider( attachedServiceProviderId: string ) {
        const transaction = await transactionRepository.get( { locationServiceProviderId: attachedServiceProviderId } );

        if ( transaction ) {
            throw new RelationsError( 'This Location Service Provider has relations and cannot be removed.' );
        }

        return await locationRepository.detachServiceProvider( attachedServiceProviderId );
    }
}
