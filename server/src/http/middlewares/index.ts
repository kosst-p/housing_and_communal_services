import { globalErrorHandle } from './errorHandle';
import { jsonParse } from './json';
import { validationJwt } from './auth';
import { withCors } from './cors';

export default {
    globalErrorHandle,
    jsonParse,
    validationJwt,
    withCors
};
