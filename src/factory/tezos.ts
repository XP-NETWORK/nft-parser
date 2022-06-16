import { setupURI } from ".";

interface NFT {
    chainId: string;
    tokenId: string;
    owner: string;
    uri: string;
    contract: string;
    collectionIdent: string;
    metadata: {
        image: string;
        imageFormat: string;
        animation_url?: string;
        animation_url_format?: string;
    };
    misc?: {
        name?: string;
        symbol?: string;
        attributes?: any;
        description?: string;
        contractType?: string;
    };
}

export const tezosDefault = async (nft: any, account: string): Promise<NFT> => {
    debugger;
    const {
        collectionIdent,
        uri,
        native: {
            tokenId,
            chainId,
            contract,
            meta: {
                token: {
                    metadata: {
                        description,
                        attributes,
                        formats,
                        image,
                        name,
                        symbol,
                    },
                },
            },
        },
    } = nft;
    const mimeType = formats.length > 0 ? formats[0]?.mimeType : undefined;
    const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
    const parsed: NFT = {
        chainId,
        tokenId,
        contract,
        uri,
        owner: account,
        collectionIdent,
        metadata: {
            image: setupURI(image),
            imageFormat: format,
        },
        misc: {
            attributes,
            symbol,
            description,
            name,
        },
    };
    console.log("tezos: ", parsed);
    return parsed;
};
// ! "KT18pPEPFqiP472bWxmxvN1NmMMFZVhojwEA"
export const TributeTezoTrooperz = async (
    nft: any,
    account: string
): Promise<NFT> => {
    const {
        collectionIdent,
        uri,
        native: {
            tokenId,
            chainId,
            contract,
            meta: {
                token: {
                    metadata: {
                        description,
                        attributes,
                        formats,
                        image,
                        name,
                        symbol,
                    },
                },
            },
        },
    } = nft;
    const mimeType = formats[0].mimeType;
    const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
    const parsed: NFT = {
        chainId,
        tokenId,
        contract,
        uri,
        owner: account,
        collectionIdent,
        metadata: {
            image: setupURI(image),
            imageFormat: format,
        },
        misc: {
            attributes,
            symbol,
            description,
            name,
        },
    };
    console.log("tezos: ", parsed);
    return parsed;
};
