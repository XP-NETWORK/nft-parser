export declare const getWrappedNft: (nft: any, account: string, whitelisted: boolean) => Promise<{
    native: any;
    chainId: any;
    tokenId: any;
    owner: string;
    uri: any;
    contract: any;
    collectionIdent: any;
    wrapped: any;
    metaData: {
        whitelisted: boolean;
        image: string;
        imageFormat: any;
        attributes: any;
        description: any;
        name: any;
    };
}>;
export declare const isAsset: (imageUri: string) => boolean;
export declare const extractType: (imageUri: string) => string;
export declare const getAssetFormat: (imageUri: string) => Promise<string>;
export declare const tryPinataWrapper: (cb: (url: string) => Promise<any>) => (url: string) => Promise<any>;
