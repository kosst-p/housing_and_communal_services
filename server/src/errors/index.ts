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

class ForbiddenError extends CustomError {
    constructor( message?: string ) {
        super( message );
        this.statusCode = 403;
        this.message = 'You do not have permission to access this resource.';
    }
}

class NotFoundError extends CustomError {
    constructor( message: string ) {
        super( message );
        this.statusCode = 404;
        this.message = message;
    }
}

export {
    CustomError,
    ValidationError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError
};
