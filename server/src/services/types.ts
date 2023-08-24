import { Schema, Document, FilterQuery, SortOrder, PaginateModel, PaginateResult } from 'mongoose';

export const ObjectId = Schema.Types.ObjectId;
export { Document };
export { FilterQuery };
export { SortOrder };
export { PaginateModel };
export { PaginateResult };
export { IDBConfig } from '@config/index';
