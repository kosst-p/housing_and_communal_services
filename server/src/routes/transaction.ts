import * as express from 'express';

import * as controller from '@http/controllers/transaction/index';
import middlewares from '@http/middlewares/index';

const router = express.Router();

router.get( '/transactions/:id', middlewares.validationJwt, controller.getTransaction );
router.get( '/transactions' );
router.post( '/transactions', middlewares.validationJwt, controller.createTransaction );
router.patch( '/transactions/:id' );
router.delete( '/transactions/:id', middlewares.validationJwt, controller.deleteTransaction );

export default router;
