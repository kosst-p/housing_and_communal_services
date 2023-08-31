import { IRequestPost, IRequestPath, IRequestPostLocationServiceProvider } from '@http/types/locations';
import { getValidationRequestBodyForUpdate, getValidationRequestBodyForCreate } from './base';

const fieldNames = [ 'country', 'region', 'city', 'address', 'houseNumber' ];
const fieldNamesForAttach = [ 'id' ];

export const validateRequestBodyForCreate = getValidationRequestBodyForCreate<IRequestPost>( fieldNames );
export const validateRequestBodyForUpdate = getValidationRequestBodyForUpdate<IRequestPath>( fieldNames );
export const validateRequestBodyForAttach = getValidationRequestBodyForCreate<IRequestPostLocationServiceProvider>( fieldNamesForAttach );
