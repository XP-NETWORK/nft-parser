import { setupURI } from ".";

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

export const tezosParser = async (
    collectionIdent: string,
    nft: any,
    account: string,
    whitelisted: boolean
) => {
    const {
        native: { contract, tokenId, chainId },
        uri,
    } = nft;
    let parsed;
    switch (collectionIdent) {
        case "KT18pPEPFqiP472bWxmxvN1NmMMFZVhojwEA":
            parsed = await TributeTezoTrooperz(nft, account, whitelisted);
            break;
        default:
            parsed = await Default(nft, account, whitelisted);
            break;
    }
    return parsed;
};

export const Default = async (
    nft: any,
    account: string,
    whitelisted: boolean
): Promise<NFT> => {
    const {
        collectionIdent,
        uri,
        native,
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
        native,
        chainId,
        tokenId,
        contract,
        uri,
        owner: account,
        collectionIdent,
        metaData: {
            whitelisted,
            image: setupURI(image),
            imageFormat: format,
            attributes,
            symbol,
            description,
            name,
        },
    };
    return parsed;
};
// ! "KT18pPEPFqiP472bWxmxvN1NmMMFZVhojwEA"
export const TributeTezoTrooperz = async (
    nft: any,
    account: string,
    whitelisted: boolean
): Promise<NFT> => {
    const {
        collectionIdent,
        uri,
        native,
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
        native,
        chainId,
        tokenId,
        contract,
        uri,
        owner: account,
        collectionIdent,
        metaData: {
            whitelisted,
            image: setupURI(image),
            imageFormat: format,
            attributes,
            symbol,
            description,
            name,
        },
    };
    return parsed;
};
