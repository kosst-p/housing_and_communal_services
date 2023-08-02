import dotenv from 'dotenv';

import Application from './framework/Application.ts';
import userRouter from './framework/user-router.ts';
import { parseJson } from './framework/middlewares/parseJson.ts';
import { parseUrl } from './framework/middlewares/parseUrl.ts';
import { parseBody } from './framework/middlewares/parseBody.ts';

dotenv.config( { path: './.env' } );

const PORT: number | string = process.env.PORT ?? 5000;
const application = new Application();

application.use( parseJson );
application.use( parseBody );
application.use( parseUrl( 'http://localhost:3000' ) );
application.addRouter( userRouter );
application.listen( PORT, () => console.log( `Server started on PORT ${ PORT }` ) );
