import * as express from 'express';

import * as authController from '../http/controllers/auth/index';
import { validationRequestBody, validationPassword, validationEmail } from '../http/controllers/auth/validation';

const router = express.Router();

router.post( '/registration', validationRequestBody, validationEmail, validationPassword, authController.registration );
router.post( '/login', authController.login );

export default router;
