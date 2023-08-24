import { IServiceProviderCreate, IServiceProviderQueryParams } from '@models/serviceProvider';
import { serviceProviderRepository } from '@repositories/index';
import { NotFoundError } from '@/errors';

export default class Actions {
    async getById( id: string ) {
        const item = await serviceProviderRepository.getById( id );

        if ( ! item ) {
            throw new NotFoundError();
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
        return await serviceProviderRepository.delete( id );
    }
}
