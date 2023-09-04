export function isEmptyObject<T>( object: T ) {
    for ( const property in object ) {
        if ( Object.prototype.hasOwnProperty.call( object, property ) ) {
            return false;
        }
    }

    return true;
}
