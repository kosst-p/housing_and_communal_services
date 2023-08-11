import * as express from 'express';

import * as authController from '../http/controllers/auth/index';
import { validationRequestBody, validationPasswordDuringRegistration, validationEmail } from '../http/controllers/auth/validation';

const router = express.Router();

router.post( '/registration', validationRequestBody, validationEmail, validationPasswordDuringRegistration, authController.registration );
router.post( '/login', validationRequestBody, authController.login );

export default router;
