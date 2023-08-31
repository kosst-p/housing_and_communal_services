import UserRepository from './user';
import LocationRepository from './locations';
import ServiceProviderRepository from './serviceProvider';
import TransactionRepository from './transaction';

export const userRepository = new UserRepository();
export const locationRepository = new LocationRepository();
export const serviceProviderRepository = new ServiceProviderRepository();
export const transactionRepository = new TransactionRepository();
