import { Response, NextFunction } from '@http/types/index';
import { IRegistrationRequest } from '@http/types/auth';
import { ValidationError } from '@errors/index';

const message = 'Fields are filled in incorrectly.';

export function registrationValidation( request: IRegistrationRequest, _response: Response, next: NextFunction ): void {
    const fieldNames = [ 'name', 'email', 'password', 'confirmPassword' ];
    const { body, } = request;
    const errorFieldNames: string[] = [];

    for ( const name of fieldNames ) {
        if ( ! body[ name as keyof typeof body ] ) {
            errorFieldNames.push( name );
        }
    }

    if ( body.password !== body.confirmPassword ) {
        if ( ! errorFieldNames.includes( 'password' ) ) {
            errorFieldNames.push( 'password' );
        }

        if ( ! errorFieldNames.includes( 'confirmPassword' ) ) {
            errorFieldNames.push( 'confirmPassword' );
        }
    }

    const regx = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

    if ( ! regx.test( body.email ) ) {
        if ( ! errorFieldNames.includes( 'email' ) ) {
            errorFieldNames.push( 'email' );
        }
    }

    if ( errorFieldNames.length > 0 ) {
        const updatedMessage = `${ message } Fields: ${ errorFieldNames.join( ', ' ) }.`;

        throw new ValidationError( updatedMessage );
    }

    next();
}
