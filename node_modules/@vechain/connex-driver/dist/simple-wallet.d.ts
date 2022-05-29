import { Wallet } from './interfaces';
/** class simply implements Wallet interface */
export declare class SimpleWallet implements Wallet {
    private readonly keys;
    get list(): Wallet.Key[];
    /**
     * import private key
     * @param privateKey hex string presented private key
     * @returns address derived from the private key
     */
    import(privateKey: string): string;
    /**
     * remove corresponding key by given address
     * @param addr address
     * @returns true if found and removed, false otherwise
     */
    remove(addr: string): boolean;
}
