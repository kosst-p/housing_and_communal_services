import * as express from 'express';

import authRouter from './auth';
import usersRouter from './users';
import locationsRouter from './locations';

const rootRouter = express.Router();

rootRouter.use( '/api', authRouter );
rootRouter.use( '/api', usersRouter );
rootRouter.use( '/api', locationsRouter );

export default rootRouter;
