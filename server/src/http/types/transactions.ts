import { Request } from './index';

export interface IRequestPostTransaction extends Request {
    params: {
        id: string,
        attachedServiceProviderId: string
    }
    body: {
        date: Date,
        price: number
    }
}
