import * as express from 'express';

import * as controller from '@http/controllers/serviceProvider/index';
import { validateRequestBodyForCreate, validateRequestBodyForUpdate } from '@/http/validations/serviceProvidersRequests';

const router = express.Router();
const routerPrefix = '/serviceProviders';

router.get( `${ routerPrefix }/:id` );
router.get( `${ routerPrefix }`, controller.paginateServiceProviders );
router.post( `${ routerPrefix }`, validateRequestBodyForCreate, controller.createServiceProvider );
router.patch( `${ routerPrefix }/:id`, validateRequestBodyForUpdate, controller.updateServiceProvider );
router.delete( `${ routerPrefix }/:id`, controller.deleteServiceProvider );

export default router;
