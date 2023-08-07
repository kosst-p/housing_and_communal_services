import { Request, Response, NextFunction } from 'express';
import { CustomError, } from '../../errors';

export function globalErrorHandle( error: CustomError, _request: Request, response: Response, _next: NextFunction ) {
    return response.status( error.statusCode ).send( {
        status: error.statusCode,
        message: error.message
    } );
}
