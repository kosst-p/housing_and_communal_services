import * as express from 'express';

import * as locationsController from '../http/controllers/locations/index';
import { validationJwt } from '../http/middlewares/jwtToken';

const router = express.Router();

router.get( '/locations/:id', validationJwt, locationsController.getLocation );
router.get( '/locations', validationJwt, locationsController.getLocations );
router.post( '/locations', validationJwt, locationsController.createLocation );

export default router;
