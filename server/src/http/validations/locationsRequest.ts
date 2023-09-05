import { IRequestPost, IRequestPath, IRequestPostLocationServiceProvider } from '@http/types/locations';
import { getValidationRequestBodyForUpdate, getValidationRequestBodyForCreate } from './base';

const fieldNames = [ 'address' ];
const fieldNamesForAttach = [ 'id' ];

export const validateRequestBodyForCreate = getValidationRequestBodyForCreate<IRequestPost>( fieldNames );
export const validateRequestBodyForUpdate = getValidationRequestBodyForUpdate<IRequestPath>( fieldNames );
export const validateRequestBodyForAttach = getValidationRequestBodyForCreate<IRequestPostLocationServiceProvider>( fieldNamesForAttach );
