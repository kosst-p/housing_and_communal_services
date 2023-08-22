import AuthRepository from './auth';
import UserRepository from './user';
import LocationRepository from './locations';
import ServiceProviderRepository from './serviceProvider';
import { config } from '../config/index';

export const authRepository = new AuthRepository( config.jwt.accessExpirationTimeInSeconds );
export const userRepository = new UserRepository();
export const locationRepository = new LocationRepository();
export const serviceProviderRepository = new ServiceProviderRepository();
