import * as express from 'express';

import * as locationsController from '../http/controllers/locations/index';

const router = express.Router();

router.get( '/locations/:id', locationsController.getLocation );
router.get( '/locations', locationsController.getLocations );
router.post( '/locations', locationsController.createLocation );

export default router;
