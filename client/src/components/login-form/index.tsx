import React, { useState } from 'react';
import FormField from '../form-field';

import styles from './styles.css';

export default function LoginForm() {
    const [ details, setDetails ] = useState( {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    } );

    function handleChange( event: React.ChangeEvent<HTMLInputElement> ): void {
        const { value, name } = event.target;

        setDetails( ( prevState ) => ( {
            ...prevState,
            [ name ]: value
        } ) );
    }

    async function handleClickCta() {
        console.log( 'login' );
    }

    return (
        <div className={ styles.container }>
            <FormField description='Name' value={ details.name } name='name' type='text' onChange={ handleChange }/>
            <FormField description='Password' value={ details.password } name='password' type='password' onChange={ handleChange }/>
            <button onClick={ handleClickCta }>
                Login
            </button>
        </div>
    );
}
