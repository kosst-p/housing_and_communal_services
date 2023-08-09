import { TRequestPost, TRequestGet, TResponse, TNextFunction } from './types';
import { ValidationError } from '../../../errors';

const message = 'Fields are filled in incorrectly.';

export function validationRequestBody( request: TRequestPost, _response: TResponse, next: TNextFunction ): void {
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

export function validationPassword( request: TRequestPost, _response: TResponse, next: TNextFunction ): void {
    const { body } = request;

    if ( body.password !== body.confirmPassword ) {
        throw new ValidationError( message );
    }

    next();
}

export function validationId( request: TRequestGet, _response: TResponse, next: TNextFunction ): void {
    const { id } = request.params;

    if ( ! id ) {
        throw new ValidationError( message );
    }

    next();
}
