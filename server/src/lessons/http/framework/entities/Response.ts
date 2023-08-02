import { ServerResponse } from 'http';

export interface Response extends ServerResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send?: ( data: any ) => void; // ?
}
