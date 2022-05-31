import { Provider } from "@ethersproject/abstract-provider";
import { stringify } from "querystring";
import {
    ChainFactoryConfigs,
    ChainFactory,
    Chain,
    AppConfigs,
    ChainParams,
} from "xp.network";
import BigNumber from "bignumber.js";
import { Interface } from "@ethersproject/abi";
import axios from "axios";

const erc721 = require("../../build/factory/ABIs/ERC721.json");
const Contract = require("web3-eth-contract");

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

export const setupURI = (uri: string): string => {
    if (uri) {
        if (uri.includes("https://ipfs.io")) {
            return uri;
        } else if (uri.includes("ipfs://")) {
            return "https://ipfs.io/" + uri.replace(":/", "");
        } else if (uri.includes("https://ipfs.io")) {
            return uri;
        } else if (
            uri.includes("data:image/") ||
            uri.includes("data:application/")
        ) {
            return uri;
        } else {
            return uri.replace("http://", "https://");
        }
    } else {
        return uri;
    }
};

const proxy = "https://sheltered-crag-76748.herokuapp.com/";

const getTestNetConfig: any = async () => {
    return await ChainFactoryConfigs.TestNet();
};

const getMainNetConfig: any = async () => {
    return await ChainFactoryConfigs.MainNet();
};

const getFactory: any = (mainNet: boolean) => {
    return mainNet ? AppConfigs.MainNet() : AppConfigs.TestNet();
};

const getChainProvider = async (chainId: string) => {
    const mainNetConfig = await getMainNetConfig();
    const testNetConfig = await getTestNetConfig();
    let provider: any;
    switch (chainId) {
        case "4":
            provider = mainNetConfig.bscParams.provider; // bscParams MainNet Provider
            return provider;
        case "6":
            provider = mainNetConfig.avalancheParams.provider; // avalancheParams MainNet Provider
            return provider;
        case "7":
            provider = mainNetConfig.polygonParams.provider; // polygonParams MainNet Provider
            return provider;
        case "8":
            provider = mainNetConfig.fantomParams.provider; // fantomParams MainNet Provider
            return provider;
        case "12":
            provider = mainNetConfig.harmonyParams.provider; // harmonyParams MainNet Provider
            return provider;
        case "14":
            provider = mainNetConfig.xDaiParams.provider; // xDaiParams MainNet Provider
            return provider;
        case "16":
            provider = mainNetConfig.fuseParams.provider; // fuseParams mainNet Provider
            return provider;
        case "19":
            provider = mainNetConfig.velasParams.provider; // velasParams mainnet Provider
            return provider;
        case "20":
            provider = mainNetConfig.iotexParams.provider; // iotexParams mainNet Provider
            return provider;
        case "21":
            provider = mainNetConfig.auroraParams.provider; // auroraParams mainnet Provider
            return provider;
        case "23":
            provider = mainNetConfig.gateChainParams.provider; // gateChainParams mainnet Provider
            return provider;
        case "5":
            provider = mainNetConfig.ropstenParams.provider; // ropstenParams mainnet Provider
            return provider;
        case "25":
            provider = mainNetConfig.vechainParams.provider; // vechainParams mainnet Provider
            return provider;
        default:
            break;
    }
};

const getSmartContract: any = async (
    chainId: string,
    contractAddress: string
) => {
    const provider = await getChainProvider(chainId);
    Contract.setProvider(provider);
    const contract = new Contract(erc721.abi, contractAddress);
    return contract;
};

export const getNFTUri = async (
    chainId: string,
    contractAddress: string,
    tokenId: string
) => {
    const contract = await getSmartContract(chainId, contractAddress);
    let uri;
    const id = BigInt(tokenId);
    contract.methods
        .tokenURI(id)
        .call()
        .then((res: any) => {})
        .catch((error: any) => console.error(error));
};

export const Default = async (nft: any, account: string): Promise<NFT> => {
    const {
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = await axios(url);
        const { data } = response;
        const { headers } = await axios(`${proxy}${data.image}`);
        const format = headers["content-type"].slice(
            headers["content-type"].lastIndexOf("/") + 1
        );
        const nft: NFT = {
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metadata: {
                image: setupURI(data.image),
                imageFormat: format,
            },
            misc: {
                attributes: data.attributes,
                description: data.description,
                name: data.name,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};

// ! 0x0271c6853d4b2bdccd53aaf9edb66993e14d4cba
// ! 0x4508af04de4073b10a53ac416eb311f4a2ab9569
export const ART_NFT_MATIC = async (
    nft: any,
    account: string
): Promise<NFT> => {
    const {
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = await axios(url);
        const { data } = response;
        const { headers } = await axios(`${proxy}${data.image}`);
        const format = headers["content-type"].slice(
            headers["content-type"].lastIndexOf("/") + 1
        );
        const nft: NFT = {
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metadata: {
                image: data.image,
                imageFormat: format,
            },
            misc: {
                attributes: data.attributes,
                name: data.name,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0xa8a079ea48dc846899bdb542f3728dbc6758fdfa
export const EtherHead = async (nft: any, account: string): Promise<NFT> => {
    const {
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = await axios(url);
        const { data } = response;
        const nft: NFT = {
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metadata: {
                image: data.image,
                imageFormat: "png",
            },
            misc: {
                description: data.description,
                name: data.name,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0x6e1ecc59f4005d0f2707ab7a0a8cecbaba41c11e
export const AngelOfAether = async (
    nft: any,
    account: string
): Promise<NFT> => {
    const {
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = await axios(url);
        const { data } = response;
        const nft: NFT = {
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metadata: {
                image: data.image,
                imageFormat: "jpg",
            },
            misc: {
                description: data.description,
                name: data.name,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0xe5b3903ffb3a00e91c75e25a4bd6616d3171e45e
export const Legend = async (nft: any, account: string): Promise<NFT> => {
    const {
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = await axios(url);
        const { data } = response;
        const { headers } = await axios(`${proxy}${setupURI(data.image)}`);
        const format = headers["content-type"].slice(
            headers["content-type"].lastIndexOf("/") + 1
        );
        const nft: NFT = {
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metadata: {
                image: setupURI(data.image),
                imageFormat: format,
            },
            misc: {
                attributes: data.attributes,
                name: data.name,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0xee6d7e31ea2095df9b2f89ec15111d3de5cd39af
export const AlphaBettyDoodle = async (
    nft: any,
    account: string
): Promise<NFT> => {
    const {
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = await axios(url);
        const { data } = response;
        console.log("🚀 ~ file: index.ts ~ line 353 ~ data", data);
        const { headers } = await axios(`${proxy}${setupURI(data.image)}`);
        console.log("🚀 ~ file: index.ts ~ line 355 ~ data", headers);
        const format = headers["content-type"].slice(
            headers["content-type"].lastIndexOf("/") + 1
        );
        const nft: NFT = {
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metadata: {
                image: setupURI(data.image),
                imageFormat: format,
            },
            misc: {
                attributes: data.attributes,
                description: data.description,
                name: data.name,
            },
        };
        console.log("data: ", nft);
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
