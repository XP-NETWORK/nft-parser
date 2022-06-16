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
exports.SuperFatAcademy = exports.TragicMonsters = exports.ABCBears = exports.Mate = exports.ArsenalGame = exports.IDoDirtPolygon = exports.BoredGUtterCats = exports.TTAV = exports.Founders_Cabinet = exports.ArcadeEdition = exports.Technomaniacs = exports.Awokensages = exports.IdoDirt = exports.TreatNFT = exports.CartelPunks = exports.TheBlackMagic = exports.RocketMonsters = exports.Mabstronauts = exports.AlphaBettyDoodle = exports.Legend = exports.AngelOfAether = exports.EtherHead = exports.ART_NFT_MATIC = exports.Default = exports.getNFTUri = exports.setupURI = void 0;
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
const Default = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${proxy}${data.image}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
                attributes: data.attributes,
                description: data.description,
                name: data.name,
            },
        };
        console.log("🚀 ~ file: index.ts ~ line 179 ~ Default ~ data", nft);
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
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${proxy}${data.image}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
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
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.ART_NFT_MATIC = ART_NFT_MATIC;
// ! 0xa8a079ea48dc846899bdb542f3728dbc6758fdfa
const EtherHead = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const nft = {
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
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.EtherHead = EtherHead;
// ! 0x6e1ecc59f4005d0f2707ab7a0a8cecbaba41c11e
const AngelOfAether = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const nft = {
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
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.AngelOfAether = AngelOfAether;
// ! 0xe5b3903ffb3a00e91c75e25a4bd6616d3171e45e
const Legend = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${proxy}${(0, exports.setupURI)(data.image)}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
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
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${proxy}${(0, exports.setupURI)(data.image)}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
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
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const nft = {
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
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.Mabstronauts = Mabstronauts;
// ! 0x0D41c70E20587c2ec1cea9c4A3d394eC63C4bfbe
const RocketMonsters = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${proxy}${(0, exports.setupURI)(data.image)}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
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
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
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
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            metaData: {
                image: nestedImage
                    ? (0, exports.setupURI)(imgResp.data.formats[0].uri)
                    : (0, exports.setupURI)(data.image),
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
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.TheBlackMagic = TheBlackMagic;
// ! 0x4c1900270dbf0c1e6a9c984aef9a18a7cb9ab1cc
const CartelPunks = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const imgResp = yield (0, axios_1.default)((0, exports.setupURI)(data.image));
        const mimeType = imgResp.headers["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
                name: data.name,
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
exports.CartelPunks = CartelPunks;
// ! 0x36f8f51f65fe200311f709b797baf4e193dd0b0d
const TreatNFT = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const newUrl = `${proxy}https://treatdao.com/api/nft/${tokenId}`;
    try {
        const response = yield (0, axios_1.default)(newUrl);
        const { data } = response;
        const imgResp = yield (0, axios_1.default)((0, exports.setupURI)(data.image));
        const mimeType = imgResp.headers["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
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
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.TreatNFT = TreatNFT;
// ! 0x2c83eaf6e460c673d92477a7c49eb4ecd04e1216
const IdoDirt = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const newUrl = `${proxy}https://treatdao.com/api/nft/${tokenId}`;
    try {
        const response = yield (0, axios_1.default)(newUrl);
        const { data } = response;
        const imgResp = yield (0, axios_1.default)((0, exports.setupURI)(data.image));
        const mimeType = imgResp.headers["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
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
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.IdoDirt = IdoDirt;
// ! 0x691bd0f2f5a145fcf297cf4be79095b66f002cbc
const Awokensages = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const newUri = `https://api.crosspunks.com/cars/meta/2/${tokenId}`;
    const baseUrl = uri;
    try {
        const response = yield (0, axios_1.default)(newUri);
        const { data } = response;
        const imgResp = yield (0, axios_1.default)((0, exports.setupURI)(data.image));
        const mimeType = imgResp.headers["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
                name: data.name,
                attributes: data.attributes,
                description: data.description,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.Awokensages = Awokensages;
// ! 0x7f3495cf2d05db6e9e52cdf989bced71e786725c
const Technomaniacs = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const newUri = `https://api.crosspunks.com/cars/meta/1/${tokenId}`;
    const baseUrl = uri;
    try {
        const response = yield (0, axios_1.default)(newUri);
        const { data } = response;
        const imgResp = yield (0, axios_1.default)((0, exports.setupURI)(data.image));
        const mimeType = imgResp.headers["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
                name: data.name,
                attributes: data.attributes,
                description: data.description,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.Technomaniacs = Technomaniacs;
// ! 0xe7f8ccda432239dcb418e94d625bc2fe6350f6bb
const ArcadeEdition = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const newUri = `https://api.alturanft.com/meta/arcade-edition/${tokenId}`;
    try {
        const response = yield (0, axios_1.default)(newUri);
        const { data } = response;
        const mimeType = data.mime;
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
                name: data.name,
                description: data.description,
            },
        };
        console.log("🚀 ~ file: index.ts ~ line 778 ~ data", nft);
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.ArcadeEdition = ArcadeEdition;
// ! 0x56d93767467c54bd86578666904087c4f16cdb7f
const Founders_Cabinet = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const newUri = `https://api.alturanft.com/meta/chain-cade-founders-edition/${tokenId}`;
    const baseUrl = uri;
    try {
        const response = yield (0, axios_1.default)(newUri);
        const { data } = response;
        const mimeType = data.mime;
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
                name: data.name,
                description: data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.Founders_Cabinet = Founders_Cabinet;
// ! 0x2d317ed6c2e3eb5c54ca7518ef19deee96c15c85
const TTAV = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const { data } = yield (0, axios_1.default)(url);
        const { headers } = yield (0, axios_1.default)((0, exports.setupURI)(data.image));
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
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
exports.TTAV = TTAV;
// ! 0x7a7ca3b27760b52428d7a9d0a9f369ff31a2de94
const BoredGUtterCats = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const newUri = `https://ipfs.moralis.io:2053/ipfs/QmV4CkNpDsiF5hSaUCJZAndDo1gVM8zxTKMbpN8teyDoTv/${tokenId}.json`;
    try {
        const { data } = yield (0, axios_1.default)(newUri);
        const { headers } = yield (0, axios_1.default)((0, exports.setupURI)(data.image));
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
                name: data.name,
                description: data.description,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.BoredGUtterCats = BoredGUtterCats;
// ! 0x2FeEE2Cc7fB32bD48AB22080e2C680f5390Ef426
const IDoDirtPolygon = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const { data } = yield (0, axios_1.default)(url);
        const { headers } = yield (0, axios_1.default)((0, exports.setupURI)(data.image));
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
                attributes: data.attributes,
                description: data.description,
                name: data.name,
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
exports.IDoDirtPolygon = IDoDirtPolygon;
// ! 0x2953399124f0cbb46d2cbacd8a89cf0599974963
const ArsenalGame = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    if (!uri)
        console.log("NFT with no uri collection: ", collectionIdent, "tokenId: ", tokenId);
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const { data } = yield (0, axios_1.default)(url);
        const { headers } = yield (0, axios_1.default)((0, exports.setupURI)(data.image));
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
                animation_url: data.animation_url,
                animation_url_format: "mp4",
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
exports.ArsenalGame = ArsenalGame;
// ! 0xc69ecd37122a9b5fd7e62bc229d478bb83063c9d
const Mate = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const { data } = yield (0, axios_1.default)(url);
        const imgResp = yield (0, axios_1.default)((0, exports.setupURI)(data.image));
        const mimeType = (_a = imgResp === null || imgResp === void 0 ? void 0 : imgResp.headers) === null || _a === void 0 ? void 0 : _a["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: (0, exports.setupURI)(data.animation_url),
                imageFormat: format,
                attributes: data.attributes,
                description: data.description,
                name: data.name,
                symbol: imgResp.data.symbol,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.Mate = Mate;
// ! 0x8eaeaa3a67abfc7c141775234fc30c707e26cf49
// ! ABCBears
const ABCBears = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    if (!uri)
        console.log("NFT with no uri collection: ", collectionIdent, "tokenId: ", tokenId);
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const { data } = yield (0, axios_1.default)(url);
        const { headers } = yield (0, axios_1.default)((0, exports.setupURI)(data.image));
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
                animation_url: data.animation_url,
                animation_url_format: "mp4",
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
exports.ABCBears = ABCBears;
// ! 0x51ecb52ebb85384679b108a9e6a017ae17754eef
// ! Tragic Monsters
const TragicMonsters = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    if (!uri)
        console.log("NFT with no uri collection: ", collectionIdent, "tokenId: ", tokenId);
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const { data } = yield (0, axios_1.default)(url);
        const { headers } = yield (0, axios_1.default)((0, exports.setupURI)(data.image));
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
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
exports.TragicMonsters = TragicMonsters;
// ! 0xbede8ad4878e5ce441accce6a828ea7bc5be1ed0
// ! Super Fat Academy NFT
const SuperFatAcademy = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    if (!uri)
        console.log("NFT with no uri collection: ", collectionIdent, "tokenId: ", tokenId);
    const url = `${proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const { data } = yield (0, axios_1.default)(url);
        const { headers } = yield (0, axios_1.default)((0, exports.setupURI)(data.image));
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                image: (0, exports.setupURI)(data.image),
                imageFormat: format,
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
exports.SuperFatAcademy = SuperFatAcademy;
