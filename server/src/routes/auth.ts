import * as express from 'express';

import * as authController from '../http/controllers/auth/index';
import { registrationValidation } from '../http/validations/auth';

const router = express.Router();

router.post( '/registration', registrationValidation, authController.registration );
router.post( '/login', authController.login );

export default router;
