import { Request, Response, NextFunction } from '../types/index';
import { CustomError } from '@errors/index';

export function globalErrorHandle( error: CustomError, _request: Request, response: Response, _next: NextFunction ) {
    console.log( error );

    return response.status( error.statusCode ).send( {
        status: error.statusCode,
        message: error.message
    } );
}
