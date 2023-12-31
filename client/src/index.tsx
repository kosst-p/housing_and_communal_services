import ReactDOM from 'react-dom/client';

import App from './components/app';
import './styles.css';

const container = document.getElementById( 'root' );

if ( container ) {
    const root = ReactDOM.createRoot( container );

    root.render( <App /> );
}
