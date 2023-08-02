import { Request } from './entities/Request.ts';
import { Response } from './entities/Response.ts';
import { User, Users } from './entities/Users.ts';

const users: Users = [
    {
        id: 1,
        name: 'Vova'
    },
    {
        id: 2,
        name: 'Vasya'
    }
];

function getUsers( request: Request, response: Response ) {
    if ( ! response.send ) {
        return; // ?
    }

    if ( request?.params?.id ) {
        const userId = parseInt( request.params.id );

        response.send( users.find( ( user ) => user.id == userId ) );

        return;
    }

    response.send( users );
}

function createUser( request: Request, response: Response ) {
    if ( ! response.send ) {
        return; // ?
    }

    if ( request?.body ) {
        const user: User = request.body;

        users.push( user );
        response.send( user );
    }
}

export default {
    getUsers,
    createUser
};
