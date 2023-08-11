import * as express from 'express';

import * as usersController from '../http/controllers/users/index';

const router = express.Router();

router.get( '/users/:id', usersController.getUser );
router.get( '/users', usersController.getUsers );

export default router;
