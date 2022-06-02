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
exports.BlackCat = exports.TheBlackMagic = exports.RocketMonsters = exports.Mabstronauts = exports.AlphaBettyDoodle = exports.Legend = exports.AngelOfAether = exports.EtherHead = exports.ART_NFT_MATIC = exports.Default = exports.getNFTUri = exports.setupURI = void 0;
const xp_network_1 = require("xp.network");
const axios_1 = __importDefault(require("axios"));
const erc721 = require("../../build/factory/ABIs/ERC721.json");
const Contract = require("web3-eth-contract");
const proxy = "https://sheltered-crag-76748.herokuapp.com/";
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
        // nftCashGet(nft);
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
exports.AlphaBettyDoodle = AlphaBettyDoodle;
const Mabstronauts = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const nft = {
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
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.Mabstronauts = Mabstronauts;
// ! 0x0D41c70E20587c2ec1cea9c4A3d394eC63C4bfbe
const RocketMonsters = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
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
            collectionIdent,
            owner: account,
            uri,
            contract,
            metadata: {
                image: (0, exports.setupURI)(data.image),
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
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.RocketMonsters = RocketMonsters;
// ! 0xDcAA2b071c1851D8Da43f85a34a5A57d4Fa93A1A
const TheBlackMagic = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    // debugger;
    const { native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    const imageFormats = ["gif", "jpg", "jpeg", "png", "svg", "webp"];
    let nestedImage;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const imgResp = yield (0, axios_1.default)((0, exports.setupURI)(data.image));
        const headers = imgResp.headers["content-type"];
        let formats;
        let mimeType;
        let format;
        if (headers.slice(headers.lastIndexOf("/") + 1) === "json") {
            nestedImage = true;
        }
        else if (imageFormats.some((f) => f === headers.slice(headers.lastIndexOf("/") + 1))) {
            nestedImage = false;
        }
        if (nestedImage) {
            formats = imgResp.data.formats;
            mimeType = imgResp.data.formats[0].mimeType;
        }
        else {
            format = headers.slice(headers.lastIndexOf("/") + 1);
        }
        const nft = {
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            metadata: {
                image: nestedImage
                    ? (0, exports.setupURI)(imgResp.data.formats[0].uri)
                    : (0, exports.setupURI)(data.image),
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
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.TheBlackMagic = TheBlackMagic;
const BlackCat = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const imgResp = yield (0, axios_1.default)(data.image);
        const mimeType = imgResp.headers.mimeType;
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
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
                description: data.description,
                attributes: data.attributes,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.BlackCat = BlackCat;
