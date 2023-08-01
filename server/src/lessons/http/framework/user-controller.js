const users = [
    {
        id:1,
        name: 'Vova'
    },
    {
        id:2,
        name: 'Vasya'
    }
];

function getUsers( request, response ) {
    if ( request.params.id ) {
        return response.send( users.find( ( user ) => user.id == request.params.id ) );
    }

    response.send( users );
}

function createUser( request, response ) {
    const user = request.body;

    users.push( user );
    response.send( user );
}

export default {
    getUsers,
    createUser
};