import React, { useState } from 'react';
import FormField from '../../form-field';

import styles from './styles.module.css';

export default function LoginForm(): React.JSX.Element {
    const [ details, setDetails ] = useState( {
        name: '',
        password: '',
    } );

    function handleChange( event: React.ChangeEvent<HTMLInputElement> ): void {
        const { value, name } = event.target;

        setDetails( ( prevState ) => ( {
            ...prevState,
            [ name ]: value
        } ) );
    }

    async function handleLoginClickCta( event: React.MouseEvent<HTMLButtonElement> ): Promise<void> {
        event.preventDefault();

        const response = await fetch( 'http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( details )
        } );

        const result = await response.json();

        console.log( result );
    }

    return (
        <form className={ styles.container }>
            <FormField
                description='Name'
                value={ details.name }
                name='name'
                type='text'
                onChange={ handleChange }
            />
            <FormField
                description='Password'
                value={ details.password }
                name='password'
                type='password'
                onChange={ handleChange }
            />
            <a
                href='/reg'
                className={ styles.signUpCta }
            >
                Sign Up
            </a>
            <button
                className={ styles.loginCta }
                onClick={ handleLoginClickCta }
            >
                Login
            </button>
        </form>
    );
}
