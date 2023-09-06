import * as express from 'express';

import * as controller from '@http/controllers/location/index';
import { validateRequestBodyForUpdate, validateRequestBodyForCreate, validateRequestBodyForAttach } from '@/http/validations/locationsRequest';

const router = express.Router();
const routerPrefix = '/locations';

router.get( `${ routerPrefix }/:id`, controller.getLocation );
router.get( `${ routerPrefix }`, controller.paginateLocations );
router.post( `${ routerPrefix }`, validateRequestBodyForCreate, controller.createLocation );
router.patch( `${ routerPrefix }/:id`, validateRequestBodyForUpdate, controller.updateLocation );
router.delete( `${ routerPrefix }/:id`, controller.deleteLocation );
router.post( `${ routerPrefix }/:id/serviceProviders`, validateRequestBodyForAttach, controller.attachServiceProvider );
router.delete( `${ routerPrefix }/:id/serviceProviders/:attachedServiceProviderId`, controller.detachServiceProvider );

export default router;
