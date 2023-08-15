import * as express from 'express';

import * as locationsController from '../http/controllers/locations/index';
import middlewares from '../http/middlewares/index';

const router = express.Router();

router.get( '/locations/:id', middlewares.validationJwt, locationsController.getLocation );
router.get( '/locations', middlewares.validationJwt, locationsController.getLocations );
router.post( '/locations', middlewares.validationJwt, locationsController.createLocation );

export default router;
