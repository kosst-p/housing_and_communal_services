import UsersActions from './users/index';
import LocationsActions from './locations/index';
import ServiceProvidersActions from './serviceProviders/index';
import TransactionsActions from './transactions/index';

export const usersActions = new UsersActions();
export const locationsActions = new LocationsActions();
export const serviceProvidersActions = new ServiceProvidersActions();
export const transactionsActions = new TransactionsActions();
