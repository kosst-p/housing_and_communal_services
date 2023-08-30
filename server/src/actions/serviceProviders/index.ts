import { IServiceProviderCreate, IServiceProviderQueryParams, IServiceProviderUpdate } from '@models/serviceProvider';
import { locationRepository, serviceProviderRepository } from '@repositories/index';
import { NotFoundError, RelationsError } from '@/errors';

export default class Actions {
    async getById( id: string ) {
        const item = await serviceProviderRepository.getById( id );

        if ( ! item ) {
            throw new NotFoundError( 'This Service Provider doesn\'t exist.' );
        }

        return item;
    }

    async paginate( params: IServiceProviderQueryParams ) {
        return await serviceProviderRepository.paginate( params );
    }

    async create( data: IServiceProviderCreate ) {
        return await serviceProviderRepository.create( data );
    }

    async delete( id: string ) {
        const attachedServiceProvider = await locationRepository.getAttachedServiceProvider( { serviceProviderId: id } );

        if ( attachedServiceProvider ) {
            throw new RelationsError( 'This Service Provider has relations and cannot be removed.' );
        }

        return await serviceProviderRepository.delete( id );
    }

    async update( id: string, data: IServiceProviderUpdate ) {
        const serviceProvider = await serviceProviderRepository.update( id, data );
        const attachedServiceProvider = await locationRepository.getAttachedServiceProvider( { serviceProviderId: id } );

        if ( attachedServiceProvider ) {
            await locationRepository.updateAttachedServiceProvider( attachedServiceProvider.id, { serviceProviderName: serviceProvider.name } );
        }

        return serviceProvider;
    }
}
