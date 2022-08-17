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
export declare const DEFAULT: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const AERMES: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const DRIFTERS: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const APOPHIS: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const INNOVATOR: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const MEDUSA: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const ORC: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const KINGSGUARD: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const ALIEN: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const WrappedXPNET: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const HOKI: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export declare const Default: (nft: any, account: string, whitelisted: boolean) => Promise<NFT>;
export {};
