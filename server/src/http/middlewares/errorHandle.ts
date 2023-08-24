
import { Request, Response, NextFunction } from '@http/types/index';
import { loggerService } from '@/services';
import { CustomError } from '@errors/index';

export function globalErrorHandle( error: CustomError, _request: Request, response: Response, _next: NextFunction ) {
    loggerService.logger.error( error );

    return response.status( error.statusCode ).send( {
        status: error.statusCode,
        message: error.message
    } );
}
