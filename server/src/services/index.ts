import DBService from './dbService';
import CacheService from './cacheService';
import loggerService from './loggerService';

import { config } from '../config/index';

export const dbService = new DBService( config.db );
export const cacheService = new CacheService( config.cache, config.jwt.accessExpirationTimeInSeconds );
export { loggerService };
