
import { IRequestPost, IRequestPath } from '@http/types/locations';
import { getValidationRequestBodyForUpdate, getValidationRequestBodyForCreate } from './base';

const fieldNames = [ 'country', 'region', 'city', 'address', 'houseNumber' ];

export const validateRequestBodyForCreate = getValidationRequestBodyForCreate<IRequestPost>( fieldNames );
export const validateRequestBodyForUpdate = getValidationRequestBodyForUpdate<IRequestPath>( fieldNames );
