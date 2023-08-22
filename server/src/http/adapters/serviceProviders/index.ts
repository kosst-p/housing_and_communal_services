import { IServiceProviderCreate, TServiceProvider } from '../../../models/serviceProvider';
import { IRequestPost } from '../../types/serviceProviders';
import BaseAdapter from '../base';

export default class DataAdapters extends BaseAdapter {
    static getServiceProviderFromBody( request: IRequestPost ): IServiceProviderCreate {
        const { name } = request.body;

        return {
            name
        };
    }

    static getLocationFull( data: TServiceProvider ) {
        return {
            id: data._id,
            name: data.name,
        };
    }
}
