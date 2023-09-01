import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { IPayload, IValidationAccessResult } from './types';
import { config } from '@config/index';

export default class AuthService {
    #expirationTimeInMinutes;

    constructor( expirationTime: number ) {
        this.#expirationTimeInMinutes = expirationTime / 60;
    }

    generateAccessToken( payload: IPayload ) {
        return jwt.sign( payload, config.jwt.accessKey, { expiresIn: `${ this.#expirationTimeInMinutes }m` } );
    }

    generateRefreshToken( payload: IPayload ) {
        return jwt.sign( payload, config.jwt.refreshKey, { expiresIn: '30d' } );
    }

    generateTokens( payload: IPayload ) {
        return {
            accessToken: this.generateAccessToken( payload ),
            refreshToken: this.generateRefreshToken( payload )
        };
    }

    validationAccessToken( token: string ) {
        const result = jwt.verify( token, config.jwt.accessKey ) as IValidationAccessResult;

        return {
            id: result.id,
            name: result.name,
        };
    }

    parseAccessToken( token?: string ) {
        if ( ! token ) {
            return null;
        }

        return token.split( ' ' )[ 1 ];
    }

    comparePassword( password: string, savedPassword: string ) {
        return bcrypt.compareSync( password, savedPassword );
    }
}
