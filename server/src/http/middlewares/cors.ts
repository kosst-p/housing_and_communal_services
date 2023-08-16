import cors from 'cors';

import { config } from '../../config';

const withCors = cors( {
    origin: config.clientUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
} );

export { withCors };
