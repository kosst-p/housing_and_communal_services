import * as express from 'express';

import * as controller from '../http/controllers/locations/index';
import { validationRequestBody } from '../http/validations/request';
import middlewares from '../http/middlewares/index';

const router = express.Router();

router.get( '/locations/:id', middlewares.validationJwt, controller.getLocation );
router.get( '/locations', middlewares.validationJwt, controller.getLocations );
router.post( '/locations', middlewares.validationJwt, controller.createLocation );
router.patch( '/locations/:id', middlewares.validationJwt, validationRequestBody, controller.updateLocation );

export default router;
