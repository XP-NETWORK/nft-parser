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
export declare const getAssetFormat: (imageUri: string) => Promise<string>;