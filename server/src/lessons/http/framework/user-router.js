import Router from './Router.js';
import controller from './user-controller.js';

const router = new Router();

router.get( '/users', controller.getUsers );
router.post( '/users',controller.createUser );

export default router;