export declare const proxy: string;
export declare const apenftKey = "rV9UjZwMSK4zqkKEWOUnUXXY2zNgPJ8i";
export declare const apenftSign = "7c9caa14981ff714f92fe16322bcf13803cd3c0d219ef008eb0e5ebf352814ca.7625.1663231473";
interface ParsedNFT {
    chainId: string;
    tokenId: string;
    owner: string;
    uri: string;
    contract?: string;
    collectionIdent: string;
    native: any;
    wrapped?: any;
    metaData: {
        image: string;
        imageFormat: string;
        animation_url?: string;
        animation_url_format?: string;
        name?: string;
        symbol?: string;
        attributes?: any;
        description?: string;
        contractType?: string;
    };
}
interface NFT {
    uri: string;
    native: {
        tokenId: string;
        chainId: string;
        contract: string | undefined;
        [x: string]: any;
    };
    collectionIdent: string;
    [x: string]: any;
}
export declare const nftGeneralParser: (nft: NFT, account: string, whitelisted: boolean, factory?: any) => Promise<ParsedNFT>;
export * from "../tools/helpers";
