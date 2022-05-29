/// <reference types="node" />
/** Net interface supports http transport */
export interface Net {
    /** base URL */
    readonly baseURL: string;
    /**
     * perform http request
     * @param method 'GET' or 'POST'
     * @param path path to access
     * @param params additional params
     * @returns response body, JSON decoded
     */
    http(method: 'GET' | 'POST', path: string, params?: Net.Params): Promise<any>;
    /**
     * open websocket reader on path
     * @param path
     */
    openWebSocketReader(path: string): Net.WebSocketReader;
}
export declare namespace Net {
    /** http request params */
    interface Params {
        query?: Record<string, string>;
        body?: any;
        headers?: Record<string, string>;
        validateResponseHeader?: (headers: Record<string, string>) => void;
    }
    /** websocket reader */
    interface WebSocketReader {
        /** read data */
        read(): Promise<any>;
        close(): void;
    }
}
/** Wallet interface manages private keys */
export interface Wallet {
    /** list all keys */
    readonly list: Wallet.Key[];
}
export declare namespace Wallet {
    /** describes an operational key */
    interface Key {
        /** address derived from key */
        address: string;
        /**
         * sign message hash
         * @param msgHash message hash
         * @returns signature
         */
        sign(msgHash: Buffer): Promise<Buffer>;
    }
}
