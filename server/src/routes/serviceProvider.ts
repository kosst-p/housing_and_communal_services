import * as express from 'express';

import * as controller from '@http/controllers/serviceProvider/index';
import middlewares from '@http/middlewares/index';
import { validateRequestBodyForCreate, validateRequestBodyForUpdate } from '@/http/validations/serviceProvidersRequests';

const router = express.Router();

router.get( '/serviceProviders/:id', middlewares.validationJwt, () => console.log() );
router.get( '/serviceProviders', middlewares.validationJwt, controller.paginateServiceProviders );
router.post( '/serviceProviders', middlewares.validationJwt, validateRequestBodyForCreate, controller.createServiceProvider );
router.patch( '/serviceProviders/:id', middlewares.validationJwt, validateRequestBodyForUpdate, () => console.log() );
router.delete( '/serviceProviders/:id', middlewares.validationJwt, controller.deleteServiceProvider );

export default router;
