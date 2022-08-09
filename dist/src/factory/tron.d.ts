interface NFT {
    chainId: string;
    tokenId: string;
    owner: string;
    uri: string;
    contract: string;
    collectionIdent: string;
    native: any;
    wrapped?: any;
    metaData: {
        whitelisted: boolean;
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
export declare const tronParser: (collectionIdent: string, nft: any, account: any, whitelisted: boolean) => Promise<NFT>;
export declare const Default: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export {};
