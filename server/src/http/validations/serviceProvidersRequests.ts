import { IRequestPath, IRequestPost } from '@http/types/serviceProviders';
import { getValidationRequestBodyForUpdate, getValidationRequestBodyForCreate } from './base';

const fieldNames = [ 'name' ];

export const validateRequestBodyForCreate = getValidationRequestBodyForCreate<IRequestPost>( fieldNames );
export const validateRequestBodyForUpdate = getValidationRequestBodyForUpdate<IRequestPath>( fieldNames );
