import * as express from 'express';
import multer from 'multer';

import * as controller from '@http/controllers/transaction/index';
import { validateRequestBodyForCreate, validateRequestBodyForUpdate } from '@/http/validations/transactionsRequest';
import { validateImport } from '@/http/validations/dataTransfer';

const router = express.Router();
const routerPrefix = '/transactions';
const upload = multer();

router.get( `${ routerPrefix }/:id`, controller.getTransaction );
router.get( `${ routerPrefix }` );
router.post( `${ routerPrefix }`, validateRequestBodyForCreate, controller.createTransaction );
router.patch( `${ routerPrefix }/:id`, validateRequestBodyForUpdate, controller.updateTransaction );
router.delete( `${ routerPrefix }/:id`, controller.deleteTransaction );
router.post( `${ routerPrefix }/importExcel`, upload.single( 'file' ), validateImport, controller.importExcel );
router.post( `${ routerPrefix }/exportExcel` );

export default router;
