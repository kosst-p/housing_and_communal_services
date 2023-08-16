import { JwtPayload } from 'jsonwebtoken';

export interface IAuth {
    id: string
    name: string,
    email?: string
}

export interface IValidationAccessResult extends JwtPayload {
    id: string,
    name: string
}
