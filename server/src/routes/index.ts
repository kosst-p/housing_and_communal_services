import * as express from 'express';

import usersRouter from './users.ts';
import locationsRouter from './locations.ts';

const rootRouter = express.Router();

rootRouter.use( '/api', usersRouter );
rootRouter.use( '/api', locationsRouter );

export default rootRouter;
