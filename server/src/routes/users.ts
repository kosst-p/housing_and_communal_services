import * as express from 'express';
import * as usersController from '../http/controllers/users/index';
import { validationRequestBody, validationPassword, validationId } from '../http/controllers/users/validation';

const router = express.Router();

router.get( '/users/:id', validationId, usersController.getUser );
router.get( '/users', usersController.getUsers );
router.post( '/users', validationRequestBody, validationPassword, usersController.createUser );
router.put( '/users/update', usersController.updateUser );

export default router;
