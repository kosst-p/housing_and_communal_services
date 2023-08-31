import { Response, NextFunction } from '@http/types/index';
import { IRegistrationRequest } from '@http/types/auth';
import { usersActions } from '@/actions/index';
import { cacheService, authService } from '@services/index';
import UserDataAdapters from '@http/adapters/users';

export async function registration( request: IRegistrationRequest, response: Response, next: NextFunction ) {
    try {
        const adaptUserData = UserDataAdapters.getUserDataFromBody( request );
        const user = await usersActions.create( adaptUserData );
        const token = authService.generateAccessToken( { id: user.id, name: user.name } );

        await cacheService.set( token, true );

        return response.send( {
            message: 'Success',
            token
        } );
    }
    catch ( error ) {
        return next( error );
    }
}
