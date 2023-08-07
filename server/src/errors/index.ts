class CustomError extends Error {
    statusCode;
    message;

    constructor( message: string ) {
        super( message );
        this.statusCode = 500;
        this.message = 'Something went wrong';

        Object.setPrototypeOf( this, CustomError.prototype );
    }
}

class ValidationError extends CustomError {
    constructor( message: string ) {
        super( message );
        this.statusCode = 400;
        this.message = message;

        Object.setPrototypeOf( this, ValidationError.prototype );
    }
}

export {
    CustomError,
    ValidationError
};
