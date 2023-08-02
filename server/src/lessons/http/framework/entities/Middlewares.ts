import { Request } from './Request.ts';
import { Response } from './Response.ts';

export type Middleware = ( request: Request, response: Response ) => void;
export type Middlewares = Middleware[];
