import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import { IUser, User } from '../../../models/user';
import { ValidationError } from '../../../errors';

interface IRequestBody extends IUser {
    confirmPassword: string
}

export async function createUser( request: Request<any, any, IRequestBody>, response: Response, next: NextFunction ) {
    try {
        await validation( request.body );

        const hashPassword = bcrypt.hashSync( request.body.password, 7 );
        const user = await new User( { ...request.body, password: hashPassword } );

        await user.save();

        return response.status( 200 ).send( {
            status: 200,
            message: 'You are registered.'
        } );
    }
    catch ( error ) {
        return next( error );
    }
}

async function validation( body: IRequestBody ): Promise<void> {
    validationBody( body );
    await checkExistUserInDb( body.name );
}

async function checkExistUserInDb( name: string ): Promise<void> {
    const candidate = await User.findOne( { name } );

    if ( candidate ) {
        throw new ValidationError( 'A user with this name already exists' );
    }
}

function validationBody( body: IRequestBody ): void {
    const message = 'Fields are filled in incorrectly.';

    if ( Object.keys( body ).length === 0 ) {
        throw new ValidationError( message );
    }

    for ( const property in body ) {
        if ( ! body[ property as keyof typeof body ] ) {
            throw new ValidationError( message );
        }
    }

    if ( body.password !== body.confirmPassword ) {
        throw new ValidationError( message );
    }
}
