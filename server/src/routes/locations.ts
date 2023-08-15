import * as express from 'express';

import * as locationsController from '../http/controllers/locations/index';
import { validationRequestBody } from '../http/validations/request';
import middlewares from '../http/middlewares/index';

const router = express.Router();

router.get( '/locations/:id', middlewares.validationJwt, locationsController.getLocation );
router.get( '/locations', middlewares.validationJwt, locationsController.getLocations );
router.post( '/locations', middlewares.validationJwt, locationsController.createLocation );
router.patch( '/locations/:id', middlewares.validationJwt, validationRequestBody, locationsController.updateLocation );

export default router;
