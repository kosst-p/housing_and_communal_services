import React, { useState } from 'react';

import AuthForm from '../auth-form';
// import LocationForm from '../location-form';

export default function App() {
    const [ isUserRegistered, setIsUserRegistered ] = useState( false );

    console.log( setIsUserRegistered );

    return (
        <React.StrictMode>
            <AuthForm isUserRegistered={ isUserRegistered } />
            { /* <LocationForm /> */ }
        </React.StrictMode>
    );
}
