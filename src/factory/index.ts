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

// const nftCashGet = async (nft: NFT) => {
//     // const uri = `https://nft-cache.herokuapp.com/nft/add/?tokenId=${nft.tokenId}&chainId=${nft.chainId}&contract=${nft.contract}`;
//     console.log("🚀 ~ file: index.ts ~ line 168 ~ nftCashGet ~ parsed", nft);
//     const uri = "https://nft-cache.herokuapp.com/nft/add";
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         data: nft,
//         uri,
//     };

//     try {
//         const response = await axios(options);
//         console.log(
//             "🚀 ~ file: index.ts ~ line 159 ~ nftCashGet ~ response",
//             response
//         );
//     } catch (error) {
//         console.error(error);
//     }
// };

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
        // nftCashGet(nft);
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
            collectionIdent,
            owner: account,
            uri,
            contract,
            metadata: {
                image: `https://ipfs.io/ipfs/${data.image}`,
                imageFormat: "png",
            },
            misc: {
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
            collectionIdent,
            owner: account,
            uri,
            contract,
            metadata: {
                image: setupURI(data.image),
                imageFormat: format,
            },
            misc: {
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
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            metadata: {
                image: nestedImage
                    ? setupURI(imgResp.data.formats[0].uri)
                    : setupURI(data.image),
                imageFormat: nestedImage
                    ? mimeType.slice(mimeType.lastIndexOf("/") + 1)
                    : format,
            },
            misc: {
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
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            metadata: {
                image: data.image,
                imageFormat: format,
            },
            misc: {
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
