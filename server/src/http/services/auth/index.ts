import * as jwt from 'jsonwebtoken';

import { IUser } from './types';
import { config } from '../../../config';

export default class AuthService {
    generateAccessToken( payload: IUser ) {
        return jwt.sign( payload, config.jwt.accessKey, { expiresIn: '15m' } );
    }

    generateRefreshToken( payload: IUser ) {
        return jwt.sign( payload, config.jwt.refreshKey, { expiresIn: '30d' } );
    }

    generateTokens( payload: IUser ) {
        return {
            accessToken: this.generateAccessToken( payload ),
            refreshToken: this.generateRefreshToken( payload )
        };
    }
}
