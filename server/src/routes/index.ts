import * as express from 'express';

import usersRouter from './users';
import locationsRouter from './locations';

const rootRouter = express.Router();

rootRouter.use( '/api', usersRouter );
rootRouter.use( '/api', locationsRouter );

export default rootRouter;
