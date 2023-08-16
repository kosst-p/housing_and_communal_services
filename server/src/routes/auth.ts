import * as express from 'express';

import * as controller from '../http/controllers/auth/index';
import { registrationValidation } from '../http/validations/auth';

const router = express.Router();

router.post( '/registration', registrationValidation, controller.registration );
router.post( '/login', controller.login );

export default router;
