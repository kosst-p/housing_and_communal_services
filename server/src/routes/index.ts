import * as express from 'express';

import authRouter from './auth';
import userRouter from './users';
import locationRouter from './locations';
import serviceProviderRouter from './serviceProvider';
import transactionRouter from './transaction';
import middlewares from '@http/middlewares/index';

const rootRouter = express.Router();
const routerPrefix = '/api';

rootRouter.use( routerPrefix, authRouter );
rootRouter.use( routerPrefix, userRouter );
rootRouter.use( routerPrefix, middlewares.validationJwt, locationRouter );
rootRouter.use( routerPrefix, middlewares.validationJwt, serviceProviderRouter );
rootRouter.use( routerPrefix, middlewares.validationJwt, transactionRouter );

export default rootRouter;
