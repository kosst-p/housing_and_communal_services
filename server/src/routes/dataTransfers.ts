import * as express from 'express';
import multer from 'multer';

const upload = multer();

import * as controller from '@http/controllers/dataTransfer/index';

const router = express.Router();

router.post( '/import', upload.single( 'file' ), controller.importDataToDB );
router.post( '/export', );


export default router;
