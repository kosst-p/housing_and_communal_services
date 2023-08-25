import { Response, NextFunction, Request } from '@http/types/index';
import { ValidationError } from '@errors/index';

const message = 'Fields are filled in incorrectly.';

export function getValidationRequestBodyForCreate<T extends Request>( fieldNames: string[] ): ( request: T, response: Response, next: NextFunction ) => void {
    return function ( request: T, _response: Response, next: NextFunction ) {
        const { body } = request;

        for ( const name of fieldNames ) {
            if ( ! body[ name as keyof typeof body ] ) {
                throw new ValidationError( message );
            }
        }

        next();
    };
}

export function getValidationRequestBodyForUpdate<T extends Request>( fieldNames: string[] ): ( request: T, response: Response, next: NextFunction ) => void {
    return function ( request: T, _response: Response, next: NextFunction ) {
        const { body } = request;
        const currentFieldsName = Object.keys( body );

        if ( currentFieldsName.length === 0 ) {
            throw new ValidationError( message );
        }

        for ( const key in body ) {
            if ( Object.prototype.hasOwnProperty.call( body, key ) ) {
                const value = body[ key as keyof typeof body ];

                if ( ! value ) {
                    throw new ValidationError( message );
                }

                if ( ! fieldNames.includes( key ) ) {
                    throw new ValidationError( message );
                }

            }
        }

        next();
    };
}
