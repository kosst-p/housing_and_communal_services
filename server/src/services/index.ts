import DBService from './dbService';
import CacheService from './cacheService';
import loggerService from './loggerService';
import AuthService from './authService';
import fileParserService from './fileParserService';

import { config } from '@config/index';

export const dbService = new DBService( config.db );
export const authService = new AuthService( config.jwt.accessExpirationTimeInSeconds );
export const cacheService = new CacheService( config.cache, config.jwt.accessExpirationTimeInSeconds );
export { loggerService };
export { fileParserService };
