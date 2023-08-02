import Router from './Router.ts';
import controller from './user-controller.ts';

const router: Router = new Router();

router.get( '/users', controller.getUsers );
router.post( '/users', controller.createUser );

export default router;
