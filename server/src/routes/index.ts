import * as express from 'express';

import authRouter from './auth';
import userRouter from './users';
import locationRouter from './locations';
import serviceProviderRouter from './serviceProvider';
import transactionRouter from './transaction';
import dataTransfersRouter from './dataTransfers';
import middlewares from '@http/middlewares/index';

const rootRouter = express.Router();
const routePrefix = '/api';

rootRouter.use( routePrefix, authRouter );
rootRouter.use( routePrefix, userRouter );
rootRouter.use( routePrefix, middlewares.validationJwt, locationRouter );
rootRouter.use( routePrefix, middlewares.validationJwt, serviceProviderRouter );
rootRouter.use( routePrefix, middlewares.validationJwt, transactionRouter );
rootRouter.use( routePrefix, middlewares.validationJwt, dataTransfersRouter );

export default rootRouter;
