import * as express from 'express';
import multer from 'multer';

import * as controller from '@http/controllers/transaction/index';
import { validateRequestBodyForCreate, validateRequestBodyForUpdate } from '@/http/validations/transactionsRequest';
import { validateImport } from '@/http/validations/dataTransfer';

const router = express.Router();
const upload = multer();

router.get( '/transactions/:id', controller.getTransaction );
router.get( '/transactions' );
router.post( '/transactions', validateRequestBodyForCreate, controller.createTransaction );
router.patch( '/transactions/:id', validateRequestBodyForUpdate, controller.updateTransaction );
router.delete( '/transactions/:id', controller.deleteTransaction );
router.post( '/transactions/importFromXlsx', upload.single( 'file' ), validateImport, controller.importFromXlsx );
router.post( '/export' );

export default router;
