import React, { useState } from 'react';

import FormField from '../form-field';

import styles from './styles.css';

export default function LocationForm(): React.JSX.Element {
    const [ details, setDetails ] = useState( {
        country: '',
        region: '',
        city: '',
        address: '',
        houseNumber: ''
    } );

    function handleChange( event: React.ChangeEvent<HTMLInputElement> ): void {
        const { value, name } = event.target;

        setDetails( ( prevState ) => ( {
            ...prevState,
            [ name ]: value
        } ) );
    }

    function handleClearClickCta( event: React.MouseEvent<HTMLButtonElement> ): void {
        event.preventDefault();

        setDetails( {
            country: '',
            region: '',
            city: '',
            address: '',
            houseNumber: ''
        } );
    }

    async function handleAddClickCta( event: React.MouseEvent<HTMLButtonElement> ): Promise<void> {
        event.preventDefault();

        const response = await fetch( 'http://localhost:3000/api/locations', {
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
                description='Country'
                value={ details.country }
                name='country'
                type='text'
                onChange={ handleChange }
            />
            <FormField
                description='Region'
                value={ details.region }
                name='region'
                type='text'
                onChange={ handleChange }
            />
            <FormField
                description='City'
                value={ details.city }
                name='city'
                type='text'
                onChange={ handleChange }
            />
            <FormField
                description='Address'
                value={ details.address }
                name='address'
                type='text'
                onChange={ handleChange }
            />
            <FormField
                description='House number'
                value={ details.houseNumber }
                name='houseNumber'
                type='text'
                onChange={ handleChange }
            />
            <button
                className={ styles.addCta }
                onClick={ handleAddClickCta }
            >
                Add
            </button>
            <button
                className={ styles.clearCta }
                onClick={ handleClearClickCta }
            >
                Clear
            </button>
        </form>
    );
}
