import React, { useState } from 'react';
import FormField from '../form-field';

import styles from './styles.css';

export default function SignUpForm(): React.JSX.Element {
    const [ details, setDetails ] = useState( {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    } );

    async function handleClickCta() {
        const response = await fetch( 'http://localhost:3000/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( details )
        } );

        const result = await response.json();

        console.log( result );
    }

    function handleChange( event: React.ChangeEvent<HTMLInputElement> ): void {
        const { value, name } = event.target;

        setDetails( ( prevState ) => ( {
            ...prevState,
            [ name ]: value
        } ) );
    }

    return (
        <div className={ styles.container }>
            <FormField description='Name' value={ details.name } name='name' type='text' onChange={ handleChange }/>
            <FormField description='Email' value={ details.email } name='email' type='email' onChange={ handleChange }/>
            <FormField description='Password' value={ details.password } name='password' type='password' onChange={ handleChange }/>
            <FormField description='Confirm Password' value={ details.confirmPassword } name='confirmPassword' type='password' onChange={ handleChange }/>
            <button
                className={ styles.cta }
                onClick={ handleClickCta }>
                Sign Up
            </button>
        </div>
    );
}
