import { ITransactionFetcher } from "./interface";
import { Err } from "./errors";
import { ITransactionEvent, ITransactionOnNetwork, ITransactionStatus } from "./interfaceOfNetwork";
export declare type PredicateIsAwaitedStatus = (status: ITransactionStatus) => boolean;
/**
 * Internal interface: a transaction, as seen from the perspective of a {@link TransactionWatcher}.
 */
interface ITransaction {
    getHash(): {
        hex(): string;
    };
}
/**
 * TransactionWatcher allows one to continuously watch (monitor), by means of polling, the status of a given transaction.
 */
export declare class TransactionWatcher {
    static DefaultPollingInterval: number;
    static DefaultTimeout: number;
    static NoopOnStatusReceived: (_: ITransactionStatus) => void;
    protected readonly fetcher: ITransactionFetcher;
    protected readonly pollingInterval: number;
    protected readonly timeout: number;
    /**
     *
     * @param fetcher The transaction fetcher
     * @param pollingInterval The polling interval, in milliseconds
     * @param timeout The timeout, in milliseconds
     */
    constructor(fetcher: ITransactionFetcher, pollingInterval?: number, timeout?: number);
    /**
     * Waits until the transaction reaches the "pending" status.
     */
    awaitPending(transaction: ITransaction): Promise<ITransactionOnNetwork>;
    /**
      * Waits until the transaction is completely processed.
      */
    awaitCompleted(transaction: ITransaction): Promise<ITransactionOnNetwork>;
    awaitAllEvents(transaction: ITransaction, events: string[]): Promise<ITransactionOnNetwork>;
    awaitAnyEvent(transaction: ITransaction, events: string[]): Promise<ITransactionOnNetwork>;
    awaitOnCondition(transaction: ITransaction, condition: (data: ITransactionOnNetwork) => boolean): Promise<ITransactionOnNetwork>;
    protected awaitConditionally<TData>(isSatisfied: (data: TData) => boolean, doFetch: () => Promise<TData>, createError: () => Err): Promise<TData>;
    protected getAllTransactionEvents(transaction: ITransactionOnNetwork): ITransactionEvent[];
}
export {};
