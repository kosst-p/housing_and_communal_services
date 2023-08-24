import * as express from 'express';

import * as controller from '../http/controllers/serviceProvider/index';
import { validationRequestBody } from '../http/validations/request';
import middlewares from '../http/middlewares/index';

const router = express.Router();

router.get( '/serviceProviders/:id', middlewares.validationJwt, () => console.log() );
router.get( '/serviceProviders', middlewares.validationJwt, controller.paginateServiceProviders );
router.post( '/serviceProviders', middlewares.validationJwt, controller.createServiceProvider );
router.patch( '/serviceProviders/:id', middlewares.validationJwt, validationRequestBody, () => console.log() );
router.delete( '/serviceProviders/:id', middlewares.validationJwt, controller.deleteServiceProvider );

export default router;
