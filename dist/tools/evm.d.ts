declare class EvmContract {
    providers: any;
    chainPrams: any;
    getUri(nft: any, collectionIdent: string): Promise<any>;
    init(chainPrams: any): void;
}
declare const _default: () => EvmContract;
export default _default;
