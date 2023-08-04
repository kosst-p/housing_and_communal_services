import { Request, Response, NextFunction } from 'express';

// import custom Errors

export function globalErrorHandle( error: Error, _request: Request, response: Response, _next: NextFunction ) {
    // use custom Errors here by 'if' statement.

    // const statusCode = error.statusCode || 500;

    console.log( error );

    return response.status( 500 ).send( {
        status: 500,
        message: 'Something went wrong'
    } );
}
