export default function parseUrl( baseUrl ) {
    return function ( request, response ) {
        const parsedUrl = new URL( request.url, baseUrl );
        const params = {};

        parsedUrl.searchParams.forEach( ( value, key ) => params[key] = value );

        request.pathname = parsedUrl.pathname;
        request.params = params;
    };
}