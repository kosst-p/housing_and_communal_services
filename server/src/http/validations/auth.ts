import { Response, NextFunction } from '../types/index';
import { IRegistrationRequest } from '../types/auth';
import { ValidationError } from '@errors/index';

const message = 'Fields are filled in incorrectly.';

export function registrationValidation( request: IRegistrationRequest, _response: Response, next: NextFunction ): void {
    const { body } = request;

    if ( ! body.name || ! body.email || ! body.password ) {
        throw new ValidationError( message );
    }

    if ( body.password !== body.confirmPassword ) {
        throw new ValidationError( message );
    }

    const regx = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

    if ( ! regx.test( request.body.email ) ) {
        throw new ValidationError( message );
    }

    next();
}
