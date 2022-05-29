import { Net } from './interfaces';
/** class simply implements Net interface */
export declare class SimpleNet implements Net {
    readonly baseURL: string;
    private readonly wsTimeout;
    private readonly axios;
    constructor(baseURL: string, timeout?: number, wsTimeout?: number);
    http(method: 'GET' | 'POST', path: string, params?: Net.Params): Promise<any>;
    openWebSocketReader(path: string): Net.WebSocketReader;
}
