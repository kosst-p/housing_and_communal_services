import * as express from 'express';

import * as controller from '@http/controllers/serviceProvider/index';
import { validateRequestBodyForCreate, validateRequestBodyForUpdate } from '@/http/validations/serviceProvidersRequests';

const router = express.Router();

router.get( '/serviceProviders/:id' );
router.get( '/serviceProviders', controller.paginateServiceProviders );
router.post( '/serviceProviders', validateRequestBodyForCreate, controller.createServiceProvider );
router.patch( '/serviceProviders/:id', validateRequestBodyForUpdate, controller.updateServiceProvider );
router.delete( '/serviceProviders/:id', controller.deleteServiceProvider );

export default router;
