import * as express from 'express';
import multer from 'multer';

import * as controller from '@http/controllers/dataTransfer/index';

const upload = multer();
const router = express.Router();

router.post( '/import', upload.single( 'file' ), controller.importData );
router.post( '/export', );

export default router;
