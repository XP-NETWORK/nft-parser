/// <reference types="@vechain/connex-types" />
export declare class Cache {
    private readonly irreversible;
    private readonly window;
    handleNewBlock(head: Connex.Thor.Status['head'], bloom?: {
        bits: string;
        k: number;
    }, block?: Connex.Thor.Block): void;
    getBlock(revision: string | number, fetch: () => Promise<Connex.Thor.Block | null>): Promise<Connex.Thor.Block | null>;
    getTx(txid: string, fetch: () => Promise<Connex.Thor.Transaction | null>): Promise<Connex.Thor.Transaction | null>;
    getReceipt(txid: string, fetch: () => Promise<Connex.Thor.Transaction.Receipt | null>): Promise<Connex.Thor.Transaction.Receipt | null>;
    getAccount(addr: string, revision: string, fetch: () => Promise<Connex.Thor.Account>): Promise<Connex.Thor.Account>;
    /**
     * get cached entry which is tied to a batch of addresses
     * @param key the cache key
     * @param revision block id where cache bound to
     * @param fetch to fetch value when cache missing
     * @param hints array of tied addresses, as the gist to invalidate cache key. undefined means the key is always
     * invalidated on different revision.
     */
    getTied(key: string, revision: string, fetch: () => Promise<any>, hints?: string[]): Promise<any>;
    private findSlot;
    private isIrreversible;
}
