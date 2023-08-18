import { IRegistrationRequest, Response, NextFunction } from '../types/auth';
import { ValidationError } from '../../errors';

const message = 'Fields are filled in incorrectly.';

export function registrationValidation( request: IRegistrationRequest, _response: Response, next: NextFunction ): void {
    const { body } = request;

    if ( body.password !== body.confirmPassword ) {
        throw new ValidationError( message );
    }

    const regx = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

    if ( ! regx.test( request.body.email ) ) {
        throw new ValidationError( message );
    }

    next();
}
