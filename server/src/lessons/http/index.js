import dotenv from 'dotenv';

import Application from './framework/Application.js';
import userRouter from './framework/user-router.js';
import parseJson from './framework/parseJson.js';
import parseUrl from './framework/parseUrl.js';
import parseBody from './framework/parseBody.js';

dotenv.config( { path: '../../../.env' } );

const PORT = process.env.PORT || 5000;
const application = new Application();

application.use( parseJson );
application.use( parseBody );
application.use( parseUrl( 'http://localhost:3000' ) );
application.addRouter( userRouter );
application.listen( PORT, () => console.log( `Server started on PORT ${PORT}` ) );