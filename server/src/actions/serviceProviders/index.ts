import { IServiceProvider, IServiceProviderFilterQuery, IServiceProviderQueryParams } from '@models/serviceProvider';
import { locationRepository, serviceProviderRepository } from '@repositories/index';
import { AlreadyExistError, NotFoundError, RelationsError } from '@/errors';

export default class Actions {
    async getById( id: string ) {
        const item = await serviceProviderRepository.getById( id );

        if ( ! item ) {
            throw new NotFoundError( 'This Service Provider doesn\'t exist.' );
        }

        return item;
    }

    async get<T extends IServiceProviderFilterQuery>( filter: T ) {
        return serviceProviderRepository.get( filter );
    }

    async paginate( params: IServiceProviderQueryParams ) {
        return await serviceProviderRepository.paginate( params );
    }

    async create( data: IServiceProvider ) {
        return await serviceProviderRepository.create( data );
    }

    async delete( id: string ) {
        const attachedServiceProvider = await locationRepository.getAttachedServiceProvider( { serviceProviderId: id } );

        if ( attachedServiceProvider ) {
            throw new RelationsError( 'This Service Provider has relations and cannot be removed.' );
        }

        return await serviceProviderRepository.delete( id );
    }

    async update( id: string, data: IServiceProvider ) {
        const candidate = await serviceProviderRepository.get( { name: data.name } );

        if ( candidate ) {
            throw new AlreadyExistError( 'The Service Provider already exists.' );
        }

        const serviceProvider = await serviceProviderRepository.update( id, data );
        const attachedServiceProvider = await locationRepository.getAttachedServiceProvider( { serviceProviderId: id } );

        if ( attachedServiceProvider ) {
            await locationRepository.updateAttachedServiceProvider( attachedServiceProvider.id, { serviceProviderName: serviceProvider.name } );
        }

        return serviceProvider;
    }
}
