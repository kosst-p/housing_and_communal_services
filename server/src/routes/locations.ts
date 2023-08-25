import * as express from 'express';

import * as controller from '@http/controllers/location/index';
import middlewares from '@http/middlewares/index';
import { validateRequestBodyForUpdate, validateRequestBodyForCreate } from '@/http/validations/locationsRequest';

const router = express.Router();

router.get( '/locations/:id', middlewares.validationJwt, controller.getLocation );
router.get( '/locations', middlewares.validationJwt, controller.paginateLocations );
router.post( '/locations', middlewares.validationJwt, validateRequestBodyForCreate, controller.createLocation );
router.patch( '/locations/:id', middlewares.validationJwt, validateRequestBodyForUpdate, controller.updateLocation );
router.delete( '/locations/:id', middlewares.validationJwt, controller.deleteLocation );

export default router;
