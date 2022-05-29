import { Net } from './interfaces';
export declare class SimpleWebSocketReader implements Net.WebSocketReader {
    private readonly timeout;
    private readonly ws;
    private callbacks;
    private error?;
    constructor(url: string, timeout?: number);
    read(): Promise<any>;
    close(): void;
    private setError;
}
