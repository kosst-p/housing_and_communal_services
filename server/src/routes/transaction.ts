import * as express from 'express';

import * as controller from '@http/controllers/transaction/index';
import { validateRequestBodyForCreate, validateRequestBodyForUpdate } from '@/http/validations/transactionsRequest';

const router = express.Router();

router.get( '/transactions/:id', controller.getTransaction );
router.get( '/transactions' );
router.post( '/transactions', validateRequestBodyForCreate, controller.createTransaction );
router.patch( '/transactions/:id', validateRequestBodyForUpdate, controller.updateTransaction );
router.delete( '/transactions/:id', controller.deleteTransaction );

export default router;
