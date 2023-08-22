import { IUserAuth } from '@models/user';

export declare global {
    namespace Express {
        export interface Request {
            user: IUserAuth
        }
    }
}
