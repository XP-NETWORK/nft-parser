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
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { nftGeneralParser } from "..";

const erc721 = require("../../build/factory/ABIs/ERC721.json");
const Contract = require("web3-eth-contract");
const proxy = "https://sheltered-crag-76748.herokuapp.com/";
interface NFT {
    chainId: string;
    tokenId: string;
    owner: string;
    uri: string;
    contract: string;
    collectionIdent: string;
    native: any;
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
        native,
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
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
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
        native,
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
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: data.image,
                imageFormat: format,
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
        native,
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
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: data.image,
                imageFormat: "png",
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
        native,
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
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: data.image,
                imageFormat: "jpg",
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
        native,
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
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
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
        native,
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
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
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

export const Mabstronauts = async (nft: any, account: string): Promise<NFT> => {
    const {
        native,
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
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            metaData: {
                image: `https://ipfs.io/ipfs/${data.image}`,
                imageFormat: "png",
                name: data.name,
                symbol: data.symbol,
                description: data.description,
                contractType: "erc1155",
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};

// ! 0x0D41c70E20587c2ec1cea9c4A3d394eC63C4bfbe
export const RocketMonsters = async (
    nft: any,
    account: string
): Promise<NFT> => {
    const {
        native,
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
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
                name: data.name,
                description: data.direction,
                attributes: data.attributes,
                contractType: "erc721",
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0xDcAA2b071c1851D8Da43f85a34a5A57d4Fa93A1A
export const TheBlackMagic = async (
    nft: any,
    account: string
): Promise<NFT> => {
    // debugger;
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    const imageFormats = ["gif", "jpg", "jpeg", "png", "svg", "webp"];
    let nestedImage;
    try {
        const response = await axios(url);
        const { data } = response;
        const imgResp = await axios(setupURI(data.image));
        const headers = imgResp.headers["content-type"];
        let formats;
        let mimeType;
        let format;
        if (headers.slice(headers.lastIndexOf("/") + 1) === "json") {
            nestedImage = true;
        } else if (
            imageFormats.some(
                (f) => f === headers.slice(headers.lastIndexOf("/") + 1)
            )
        ) {
            nestedImage = false;
        }
        if (nestedImage) {
            formats = imgResp.data.formats;
            mimeType = imgResp.data.formats[0].mimeType;
        } else {
            format = headers.slice(headers.lastIndexOf("/") + 1);
        }
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            metaData: {
                image: nestedImage
                    ? setupURI(imgResp.data.formats[0].uri)
                    : setupURI(data.image),
                imageFormat: nestedImage
                    ? mimeType.slice(mimeType.lastIndexOf("/") + 1)
                    : format,
                name: imgResp.data.name || data.name,
                description: imgResp.data.description || data.description,
                symbol: imgResp.data.symbol || data.symbols,
                attributes: data.attributes || imgResp.data.attributes,
                contractType: "erc721",
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0x4c1900270dbf0c1e6a9c984aef9a18a7cb9ab1cc
export const CartelPunks = async (nft: any, account: string): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = await axios(url);
        const { data } = response;
        const imgResp = await axios(setupURI(data.image));
        const mimeType = imgResp.headers["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
                name: data.name,
                attributes: data.attributes,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0x36f8f51f65fe200311f709b797baf4e193dd0b0d
export const TreatNFT = async (nft: any, account: string): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const baseUrl = uri;
    const newUrl = `${proxy}https://treatdao.com/api/nft/${tokenId}`;
    try {
        const response = await axios(newUrl);
        const { data } = response;
        const imgResp = await axios(setupURI(data.image));
        const mimeType = imgResp.headers["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUrl,
            contract,
            metaData: {
                image: data.image,
                imageFormat: format,
                name: data.name,
                attributes: data.attributes,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0x2c83eaf6e460c673d92477a7c49eb4ecd04e1216
export const IdoDirt = async (nft: any, account: string): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const baseUrl = uri;
    const newUrl = `${proxy}https://treatdao.com/api/nft/${tokenId}`;
    try {
        const response = await axios(newUrl);
        const { data } = response;
        const imgResp = await axios(setupURI(data.image));
        const mimeType = imgResp.headers["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUrl,
            contract,
            metaData: {
                image: data.image,
                imageFormat: format,
                name: data.name,
                attributes: data.attributes,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0x691bd0f2f5a145fcf297cf4be79095b66f002cbc
export const Awokensages = async (nft: any, account: string): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const newUri = `https://api.crosspunks.com/cars/meta/2/${tokenId}`;
    const baseUrl = uri;
    try {
        const response = await axios(newUri);
        const { data } = response;
        const imgResp = await axios(setupURI(data.image));
        const mimeType = imgResp.headers["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
                name: data.name,
                attributes: data.attributes,
                description: data.description,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0x7f3495cf2d05db6e9e52cdf989bced71e786725c
export const Technomaniacs = async (
    nft: any,
    account: string
): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const newUri = `https://api.crosspunks.com/cars/meta/1/${tokenId}`;
    const baseUrl = uri;
    try {
        const response = await axios(newUri);
        const { data } = response;
        const imgResp = await axios(setupURI(data.image));
        const mimeType = imgResp.headers["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
                name: data.name,
                attributes: data.attributes,
                description: data.description,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0xe7f8ccda432239dcb418e94d625bc2fe6350f6bb
export const ArcadeEdition = async (
    nft: any,
    account: string
): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const newUri = `https://api.alturanft.com/meta/arcade-edition/${tokenId}`;
    try {
        const response = await axios(newUri);
        const { data } = response;
        const mimeType = data.mime;
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
                name: data.name,
                description: data.description,
            },
        };
        console.log("🚀 ~ file: index.ts ~ line 778 ~ data", nft);
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0x56d93767467c54bd86578666904087c4f16cdb7f
export const Founders_Cabinet = async (
    nft: any,
    account: string
): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const newUri = `https://api.alturanft.com/meta/chain-cade-founders-edition/${tokenId}`;
    const baseUrl = uri;
    try {
        const response = await axios(newUri);
        const { data } = response;
        const mimeType = data.mime;
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
                name: data.name,
                description: data.name,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0x2d317ed6c2e3eb5c54ca7518ef19deee96c15c85
export const TTAV = async (nft: any, account: string): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = await axios(url);
        const { headers } = await axios(setupURI(data.image));
        const format = headers["content-type"].slice(
            headers["content-type"].lastIndexOf("/") + 1
        );
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
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
// ! 0x7a7ca3b27760b52428d7a9d0a9f369ff31a2de94
export const BoredGUtterCats = async (
    nft: any,
    account: string
): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const newUri = `https://ipfs.moralis.io:2053/ipfs/QmV4CkNpDsiF5hSaUCJZAndDo1gVM8zxTKMbpN8teyDoTv/${tokenId}.json`;
    try {
        const { data } = await axios(newUri);
        const { headers } = await axios(setupURI(data.image));
        const format = headers["content-type"].slice(
            headers["content-type"].lastIndexOf("/") + 1
        );
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
                name: data.name,
                description: data.description,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0x2FeEE2Cc7fB32bD48AB22080e2C680f5390Ef426
export const IDoDirtPolygon = async (
    nft: any,
    account: string
): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = await axios(url);
        const { headers } = await axios(setupURI(data.image));
        const format = headers["content-type"].slice(
            headers["content-type"].lastIndexOf("/") + 1
        );
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
                attributes: data.attributes,
                description: data.description,
                name: data.name,
                contractType: "erc721",
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0x2953399124f0cbb46d2cbacd8a89cf0599974963
export const ArsenalGame = async (nft: any, account: string): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    if (!uri)
        console.log(
            "NFT with no uri collection: ",
            collectionIdent,
            "tokenId: ",
            tokenId
        );
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = await axios(url);
        const { headers } = await axios(setupURI(data.image));
        const format = headers["content-type"].slice(
            headers["content-type"].lastIndexOf("/") + 1
        );
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
                animation_url: data.animation_url,
                animation_url_format: "mp4",
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
// ! 0xc69ecd37122a9b5fd7e62bc229d478bb83063c9d
export const Mate = async (nft: any, account: string): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = await axios(url);
        const imgResp = await axios(setupURI(data.image));
        const mimeType = imgResp?.headers?.["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: setupURI(data.animation_url),
                imageFormat: format,
                attributes: data.attributes,
                description: data.description,
                name: data.name,
                symbol: imgResp.data.symbol,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);
        return nft;
    }
};
// ! 0x8eaeaa3a67abfc7c141775234fc30c707e26cf49
// ! ABCBears
export const ABCBears = async (nft: any, account: string): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    if (!uri)
        console.log(
            "NFT with no uri collection: ",
            collectionIdent,
            "tokenId: ",
            tokenId
        );
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = await axios(url);
        const { headers } = await axios(setupURI(data.image));
        const format = headers["content-type"].slice(
            headers["content-type"].lastIndexOf("/") + 1
        );
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
                animation_url: data.animation_url,
                animation_url_format: "mp4",
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
// ! 0x51ecb52ebb85384679b108a9e6a017ae17754eef
// ! Tragic Monsters
export const TragicMonsters = async (
    nft: any,
    account: string
): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    if (!uri)
        console.log(
            "NFT with no uri collection: ",
            collectionIdent,
            "tokenId: ",
            tokenId
        );
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = await axios(url);
        const { headers } = await axios(setupURI(data.image));
        const format = headers["content-type"].slice(
            headers["content-type"].lastIndexOf("/") + 1
        );
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
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
// ! 0xbede8ad4878e5ce441accce6a828ea7bc5be1ed0
// ! Super Fat Academy NFT
export const SuperFatAcademy = async (
    nft: any,
    account: string
): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    if (!uri)
        console.log(
            "NFT with no uri collection: ",
            collectionIdent,
            "tokenId: ",
            tokenId
        );
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = await axios(url);
        const { headers } = await axios(setupURI(data.image));
        const format = headers["content-type"].slice(
            headers["content-type"].lastIndexOf("/") + 1
        );
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
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

// ! 0xb94c3fd0016888bab09dbc229f9397294e828a54
// ! Forgotten Runes Comic
export const ForgottenRunesComic = async (
    nft: any,
    account: string
): Promise<NFT> => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = await axios(url);
        const { data } = response;
        console.log("🚀 ~ file: index.ts ~ line 1152 ~ data", data);
        const { headers } = await axios(`${proxy}${data.image}`);
        console.log("🚀 ~ file: index.ts ~ line 1154 ~ data", headers);
        const format = headers["content-type"].slice(
            headers["content-type"].lastIndexOf("/") + 1
        );
        const nft: NFT = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: setupURI(data.image),
                imageFormat: format,
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
