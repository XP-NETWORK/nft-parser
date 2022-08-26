interface NFT {
    chainId: string;
    tokenId: string;
    owner: string;
    uri: string;
    contract?: string;
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
export declare const algorandParser: (collectionIdent: string, nft: any, account: any, whitelisted: boolean) => Promise<NFT>;
export declare const Default: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const LikeD00dles: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const WarriorCroc: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const Alchemon: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const SMC: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const CBCG: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export {};
