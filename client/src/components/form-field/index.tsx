import React from 'react';
import styles from './styles.css';

interface FieldProps {
    description: string,
    value: string,
    type: string
    name: string,
    onChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void,
}

export default function FormField( {
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
                className={ styles.control }
            />
        </label>
    );
}
