import { Response, NextFunction, Request } from '@http/types/index';
import { ValidationError } from '@errors/index';

const message = 'Fields are filled in incorrectly.';

export function getValidationRequestBodyForCreate<T extends Request>( fieldNames: string[] ): ( request: T, response: Response, next: NextFunction ) => void {
    return function ( request: T, _response: Response, next: NextFunction ) {
        const { body } = request;
        const errorFieldNames: string[] = [];

        for ( const name of fieldNames ) {
            if ( ! body[ name as keyof typeof body ] ) {
                errorFieldNames.push( name );
            }
        }

        if ( errorFieldNames.length > 0 ) {
            const updatedMessage = `${ message } Fields: ${ errorFieldNames.join( ', ' ) }.`;

            throw new ValidationError( updatedMessage );
        }

        next();
    };
}

export function getValidationRequestBodyForUpdate<T extends Request>( fieldNames: string[] ): ( request: T, response: Response, next: NextFunction ) => void {
    return function ( request: T, _response: Response, next: NextFunction ) {
        const { body } = request;
        const errorFieldNames: string[] = [];
        const currentFieldsName = Object.keys( body );

        if ( currentFieldsName.length === 0 ) {
            throw new ValidationError( message );
        }

        for ( const key in body ) {
            if ( Object.prototype.hasOwnProperty.call( body, key ) ) {
                const value = body[ key as keyof typeof body ];

                if ( ! value ) {
                    errorFieldNames.push( key );
                }

                if ( ! fieldNames.includes( key ) ) {
                    errorFieldNames.push( key );
                }

            }
        }

        if ( errorFieldNames.length > 0 ) {
            const updatedMessage = `${ message } Fields: ${ errorFieldNames.join( ', ' ) }.`;

            throw new ValidationError( updatedMessage );
        }

        next();
    };
}
