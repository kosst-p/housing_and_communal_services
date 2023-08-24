import * as express from 'express';

import * as controller from '@http/controllers/user/index';

const router = express.Router();

router.get( '/users/:id', controller.getUser );
router.get( '/users', controller.getUsers );

export default router;
