import * as express from 'express';

import * as usersController from '../http/controllers/users/index';
import { validationRequestBody, validationPassword, validationId, validationEmail } from '../http/controllers/users/validation';

const router = express.Router();

router.get( '/users/:id', validationId, usersController.getUser );
router.get( '/users', usersController.getUsers );
router.post( '/users', validationRequestBody, validationEmail, validationPassword, usersController.createUser );

export default router;
