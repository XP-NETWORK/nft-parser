interface NFT {
    native: any;
    chainId: string;
    tokenId: string;
    owner: string;
    uri: string;
    contract?: string;
    collectionIdent: string;
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
export declare const checkEmptyFromTezos: (data: any) => Promise<any>;
export declare const tezosParser: (collectionIdent: string, nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const Default: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const TributeTezoTrooperz: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const Rarible: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export {};
