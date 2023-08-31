import * as express from 'express';

import * as controller from '@http/controllers/location/index';
import { validateRequestBodyForUpdate, validateRequestBodyForCreate, validateRequestBodyForAttach } from '@/http/validations/locationsRequest';

const router = express.Router();

router.get( '/locations/:id', controller.getLocation );
router.get( '/locations', controller.paginateLocations );
router.post( '/locations', validateRequestBodyForCreate, controller.createLocation );
router.patch( '/locations/:id', validateRequestBodyForUpdate, controller.updateLocation );
router.delete( '/locations/:id', controller.deleteLocation );
router.post( '/locations/:id/serviceProviders', validateRequestBodyForAttach, controller.attachServiceProvider );
router.delete( '/locations/:id/serviceProviders/:attachedServiceProviderId', controller.detachServiceProvider );

export default router;
