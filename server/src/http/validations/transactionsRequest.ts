import { IRequestPost, IRequestPath } from '@http/types/transactions';
import { getValidationRequestBodyForUpdate, getValidationRequestBodyForCreate } from './base';

const fieldNamesForCreate = [ 'locationServiceProviderId', 'date', 'price' ];
const fieldNamesForUpdate = [ 'date', 'price' ];

export const validateRequestBodyForCreate = getValidationRequestBodyForCreate<IRequestPost>( fieldNamesForCreate );
export const validateRequestBodyForUpdate = getValidationRequestBodyForUpdate<IRequestPath>( fieldNamesForUpdate );
