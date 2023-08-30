import * as express from 'express';

import authRouter from './auth';
import userRouter from './users';
import locationRouter from './locations';
import serviceProviderRouter from './serviceProvider';
import transactionRouter from './transaction';

const rootRouter = express.Router();
const routePrefix = '/api';

rootRouter.use( routePrefix, authRouter );
rootRouter.use( routePrefix, userRouter );
rootRouter.use( routePrefix, locationRouter );
rootRouter.use( routePrefix, serviceProviderRouter );
rootRouter.use( routePrefix, transactionRouter );

export default rootRouter;
