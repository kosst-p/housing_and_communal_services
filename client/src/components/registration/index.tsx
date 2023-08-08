import React, { useState } from 'react';
import styles from './styles.css';

export default function Registration(): React.JSX.Element {
    const [ details, setDetails ] = useState( {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    } );

    async function handleClickCta() {
        const response = await fetch( 'http://localhost:3000/api/users', {
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
            <Field description='Name' value={ details.name } name='name' type='text' onChange={ handleChange }/>
            <Field description='Email' value={ details.email } name='email' type='email' onChange={ handleChange }/>
            <Field description='Password' value={ details.password } name='password' type='password' onChange={ handleChange }/>
            <Field description='Confirm Password' value={ details.confirmPassword } name='confirmPassword' type='password' onChange={ handleChange }/>
            <button onClick={ handleClickCta }>
                Sign Up
            </button>
        </div>
    );
}

interface FieldProps {
    description: string,
    value: string,
    type: string
    name: string,
    onChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void,
}

function Field( {
    description,
    value,
    type,
    name,
    onChange
}: FieldProps ): React.JSX.Element {

    return (
        <label className={ styles.label }>
            { description }
            <input
                value={ value }
                type={ type }
                name={ name }
                onChange={ onChange }
            />
        </label>
    );
}
