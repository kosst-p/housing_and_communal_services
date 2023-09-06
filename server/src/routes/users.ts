import * as express from 'express';

import * as controller from '@http/controllers/user/index';

const router = express.Router();
const routerPrefix = '/users';

router.get( `${ routerPrefix }/:id`, controller.getUser );
router.get( `${ routerPrefix }`, controller.getUsers );

export default router;
