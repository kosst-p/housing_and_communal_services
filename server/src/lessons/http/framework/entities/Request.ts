import { IncomingMessage } from 'http';

type Params = Record<string, string>;
type Body = {
    id: number,
    name: string
};

export interface Request extends IncomingMessage {
    body?: Body;
    pathname?: string;
    params?: Params;
}
