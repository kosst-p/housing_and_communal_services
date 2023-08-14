class CustomError extends Error {
    statusCode;
    message: string = 'Something went wrong';

    constructor( message?: string ) {
        super( message );
        this.statusCode = 500;
    }
}

class ValidationError extends CustomError {
    constructor( message: string ) {
        super( message );
        this.statusCode = 400;
        this.message = message;
    }
}

class UnauthorizedError extends CustomError {
    constructor( message?: string ) {
        super( message );
        this.statusCode = 401;
        this.message = 'Unauthorized';
    }
}

export {
    CustomError,
    ValidationError,
    UnauthorizedError
};
