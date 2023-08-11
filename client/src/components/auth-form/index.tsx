import React from 'react';

import SignUpForm from './sign-up-form';
import LoginForm from './login-form';

import styles from './styles.css';

interface IAuthFormProps {
    isUserRegistered: boolean
}

export default function AuthForm( {
    isUserRegistered
}: IAuthFormProps ): React.JSX.Element {
    return (
        <div className={ styles.container }>
            { ! isUserRegistered ?
                <SignUpForm /> :
                <LoginForm />
            }
        </div>
    );
}
