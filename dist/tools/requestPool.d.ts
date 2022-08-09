import { AxiosResponse } from "axios";
interface Request {
    url: string;
    resolve: (value: unknown) => void;
    tryNumber: number;
}
declare class RequestPool {
    requests: Request[];
    timeout: number;
    constructor(initialTimout: number);
    addRequest(url: string): Promise<unknown> | undefined;
    release(req: Request, res: AxiosResponse<any, any> | {}): void;
    execute(url: string, tm?: number): void;
}
declare const _default: (initialTimout: number) => RequestPool;
export default _default;
