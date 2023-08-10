import * as express from 'express';

import * as usersController from '../http/controllers/users/index';
import { validationId } from '../http/controllers/auth/validation';

const router = express.Router();

router.get( '/users/:id', validationId, usersController.getUser );
router.get( '/users', usersController.getUsers );

export default router;
