import DBService from './dbService';
import CacheService from './cacheService';

import { config } from '../config/index';

export const dbServiceInstance = new DBService( config.db );
export const cacheServiceInstance = new CacheService( config.cache );
