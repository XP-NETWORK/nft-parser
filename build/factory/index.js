"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphaBettyDoodle = exports.Legend = exports.AngelOfAether = exports.EtherHead = exports.ART_NFT_MATIC = exports.Default = exports.getNFTUri = exports.setupURI = void 0;
const xp_network_1 = require("xp.network");
const axios_1 = __importDefault(require("axios"));
const erc721 = require("../../build/factory/ABIs/ERC721.json");
const Contract = require("web3-eth-contract");
const setupURI = (uri) => {
    if (uri) {
        if (uri.includes("https://ipfs.io")) {
            return uri;
        }
        else if (uri.includes("ipfs://")) {
            return "https://ipfs.io/" + uri.replace(":/", "");
        }
        else if (uri.includes("https://ipfs.io")) {
            return uri;
        }
        else if (uri.includes("data:image/") ||
            uri.includes("data:application/")) {
            return uri;
        }
        else {
            return uri.replace("http://", "https://");
        }
    }
    else {
        return uri;
    }
};
exports.setupURI = setupURI;
const proxy = "https://sheltered-crag-76748.herokuapp.com/";
const getTestNetConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield xp_network_1.ChainFactoryConfigs.TestNet();
});
const getMainNetConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield xp_network_1.ChainFactoryConfigs.MainNet();
});
const getFactory = (mainNet) => {
    return mainNet ? xp_network_1.AppConfigs.MainNet() : xp_network_1.AppConfigs.TestNet();
};
const getChainProvider = (chainId) => __awaiter(void 0, void 0, void 0, function* () {
    const mainNetConfig = yield getMainNetConfig();
    const testNetConfig = yield getTestNetConfig();
    let provider;
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
});
const getSmartContract = (chainId, contractAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = yield getChainProvider(chainId);
    Contract.setProvider(provider);
    const contract = new Contract(erc721.abi, contractAddress);
    return contract;
});
const getNFTUri = (chainId, contractAddress, tokenId) => __awaiter(void 0, void 0, void 0, function* () {
    const contract = yield getSmartContract(chainId, contractAddress);
    let uri;
    const id = BigInt(tokenId);
    contract.methods
        .tokenURI(id)
        .call()
        .then((res) => { })
        .catch((error) => console.error(error));
});
exports.getNFTUri = getNFTUri;
const Default = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${proxy}${data.image}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metadata: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
            },
            misc: {
                attributes: data.attributes,
                description: data.description,
                name: data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.Default = Default;
// ! 0x0271c6853d4b2bdccd53aaf9edb66993e14d4cba
// ! 0x4508af04de4073b10a53ac416eb311f4a2ab9569
const ART_NFT_MATIC = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${proxy}${data.image}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
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
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.ART_NFT_MATIC = ART_NFT_MATIC;
// ! 0xa8a079ea48dc846899bdb542f3728dbc6758fdfa
const EtherHead = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const nft = {
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
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.EtherHead = EtherHead;
// ! 0x6e1ecc59f4005d0f2707ab7a0a8cecbaba41c11e
const AngelOfAether = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const nft = {
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
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.AngelOfAether = AngelOfAether;
// ! 0xe5b3903ffb3a00e91c75e25a4bd6616d3171e45e
const Legend = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${proxy}${(0, exports.setupURI)(data.image)}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metadata: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
            },
            misc: {
                attributes: data.attributes,
                name: data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.Legend = Legend;
// ! 0xee6d7e31ea2095df9b2f89ec15111d3de5cd39af
const AlphaBettyDoodle = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        console.log("🚀 ~ file: index.ts ~ line 353 ~ data", data);
        const { headers } = yield (0, axios_1.default)(`${proxy}${(0, exports.setupURI)(data.image)}`);
        console.log("🚀 ~ file: index.ts ~ line 355 ~ data", headers);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metadata: {
                image: (0, exports.setupURI)(data.image),
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
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.AlphaBettyDoodle = AlphaBettyDoodle;
