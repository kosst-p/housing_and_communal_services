import { ILoginRequest, IRegistrationRequest, TResponse, TNextFunction } from './types';
import { ValidationError } from '../../../errors';

const message = 'Fields are filled in incorrectly.';

export function validationRequestBody( request: ILoginRequest | IRegistrationRequest, _response: TResponse, next: TNextFunction ): void {
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

export function validationPasswordDuringRegistration( request: IRegistrationRequest, _response: TResponse, next: TNextFunction ): void {
    const { body } = request;

    if ( body.password !== body.confirmPassword ) {
        throw new ValidationError( message );
    }

    next();
}

export function validationEmail( request: IRegistrationRequest, _response: TResponse, next: TNextFunction ) {
    const regx = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

    if ( ! regx.test( request.body.email ) ) {
        throw new ValidationError( message );
    }

    next();
}
