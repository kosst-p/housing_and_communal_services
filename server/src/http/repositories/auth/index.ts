import jwt from 'jsonwebtoken';

import { IAuth } from './types';
import { config } from '../../../config';

export default class AuthRepository {
    generateAccessToken( payload: IAuth ) {
        return jwt.sign( payload, config.jwt.accessKey, { expiresIn: '15m' } );
    }

    generateRefreshToken( payload: IAuth ) {
        return jwt.sign( payload, config.jwt.refreshKey, { expiresIn: '30d' } );
    }

    generateTokens( payload: IAuth ) {
        return {
            accessToken: this.generateAccessToken( payload ),
            refreshToken: this.generateRefreshToken( payload )
        };
    }

    validationAccessToken( token: string ) {
        return jwt.verify( token, config.jwt.accessKey );
    }
}

