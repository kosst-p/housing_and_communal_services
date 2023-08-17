import { IRequestPath, Response, NextFunction } from '../types/locations';
import { ValidationError } from '../../errors';

const message = 'Fields are filled in incorrectly.';

export function validationRequestBody( request: IRequestPath, _response: Response, next: NextFunction ): void {
    const { body } = request;

    if ( Object.keys( body ).length === 0 ) {
        throw new ValidationError( message );
    }

    for ( const property in body ) {
        if ( ! body[ property as keyof typeof body ] ) {
            throw new ValidationError( message );
        }
    }

    next();
}