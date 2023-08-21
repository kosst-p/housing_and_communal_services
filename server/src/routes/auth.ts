import * as express from 'express';

import * as controller from '../http/controllers/auth/index';
import { registrationValidation } from '../http/validations/auth';
import middlewares from '../http/middlewares/index';

const router = express.Router();

router.post( '/registration', registrationValidation, controller.registration );
router.post( '/login', controller.login );
router.post( '/logout', middlewares.validationJwt, controller.logout );

export default router;
