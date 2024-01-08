import { Request, Response, NextFunction } from '@http/types/index';
import { loggerService } from '@/services';
import { CustomError } from '@errors/index';

// eslint-disable-next-line max-params
export function globalErrorHandle( error: CustomError, _request: Request, response: Response, _next: NextFunction ) {
    loggerService.logger.error( error );

    return response.status( error.statusCode ).send( {
        status: error.statusCode,
        message: error.message,
    } );
}
