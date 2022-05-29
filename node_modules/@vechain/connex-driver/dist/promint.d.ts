/** class to make promise interruptable */
export declare class PromInt {
    private rejectors;
    /**
     * interrupt all wrapped promises
     */
    interrupt(): void;
    /**
     * wrap the promise
     * @param p the given promise
     * @returns the wrapped promise which will raise InterruptedError on interruption
     */
    wrap<T>(p: Promise<T>): Promise<T>;
}
export declare class InterruptedError extends Error {
    constructor();
}
