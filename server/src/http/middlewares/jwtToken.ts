import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import AuthService from '../services/auth';

interface IJwtRequest extends Request {
    user?: JwtPayload | string;
}

export function validationJwt( request: IJwtRequest, response: Response, next: NextFunction ) {
    try {
        const authorizationHeader = request.headers.authorization;

        if ( ! authorizationHeader ) {
            return response.status( 401 ).send( {
                status: 401,
                message: 'Unauthorized'
            } );
        }

        const accessToken = authorizationHeader.split( ' ' )[ 1 ] ;

        if ( ! accessToken ) {
            return response.status( 401 ).send( {
                status: 401,
                message: 'Unauthorized'
            } );
        }

        const authService = new AuthService();
        const result = authService.validationAccessToken( accessToken );

        request.user = result;
        next();
    }
    catch ( error ) {
        return response.status( 401 ).send( {
            status: 401,
            message: 'Unauthorized'
        } );
    }
}
