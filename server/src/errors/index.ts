class CustomError extends Error {
    statusCode;
    message;

    constructor( message?: string ) {
        super( message );
        this.statusCode = 500;
        this.message = 'Something went wrong';
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
