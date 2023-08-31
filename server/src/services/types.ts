import { Schema, Document, FilterQuery, SortOrder, PaginateModel, PaginateResult } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export const ObjectId = Schema.Types.ObjectId;
export { Document };
export { FilterQuery };
export { SortOrder };
export { PaginateModel };
export { PaginateResult };
export { IDBConfig } from '@config/index';
export interface IPayload {
    id: string
    name: string,
    email?: string
}
export interface IValidationAccessResult extends JwtPayload {
    id: string,
    name: string
}
