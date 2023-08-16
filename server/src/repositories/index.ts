import AuthRepository from './auth';
import UserRepository from './user';
import LocationRepository from './locations';

export const authRepository = new AuthRepository();
export const userRepository = new UserRepository();
export const locationRepository = new LocationRepository();
