import React, { useState } from 'react';

import AuthForm from '../auth-form';

export default function App() {
    const [ isUserRegistered, setIsUserRegistered ] = useState( false );

    return (
        <React.StrictMode>
            <AuthForm isUserRegistered={ isUserRegistered } />
        </React.StrictMode>
    );
}
