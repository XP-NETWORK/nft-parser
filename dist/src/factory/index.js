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
exports.WrappedXPNET = exports.Mountains = exports.Cities = exports.Weed = exports.Drifters = exports.VelasOgPunks = exports.PACK = exports.WUBI = exports.TRSRNFT = exports.MachineFi = exports.DirtyLife = exports.COZYCOSM = exports.OPENSTORE = exports.ChainCaders = exports.OpenSEA = exports.Nagato = exports.InterestingCPeople = exports.TheCheeks = exports.LilDickie = exports.ForgottenRunesComic = exports.SuperFatAcademy = exports.TragicMonsters = exports.ABCBears = exports.Mate = exports.ArsenalGame = exports.IDoDirtPolygon = exports.BoredGUtterCats = exports.TTAV = exports.Founders_Cabinet = exports.ArcadeEdition = exports.Technomaniacs = exports.Awokensages = exports.IdoDirt = exports.TreatNFT = exports.CartelPunks = exports.TheBlackMagic = exports.RocketMonsters = exports.Mabstronauts = exports.AlphaBettyDoodle = exports.Legend = exports.AngelOfAether = exports.EtherHead = exports.ART_NFT_MATIC = exports.Default = exports.setupURI = void 0;
const axios_1 = __importDefault(require("axios"));
const tezos_1 = require("./tezos");
const requestPool_1 = __importDefault(require("../../tools/requestPool"));
const helpers_1 = require("../../tools/helpers");
const __1 = require("..");
const pool = (0, requestPool_1.default)(3000);
const cheerio = require("cherio");
const setupURI = (uri) => {
    if (uri) {
        if (uri.includes("https://ipfs.io")) {
            return uri;
        }
        else if (/^ipfs:\/\//.test(uri)) {
            return "https://ipfs.io/ipfs/" + uri.split("://")[1];
        }
        else if (/^https\:\/\/ipfs.io/.test(uri)) {
            return uri;
        }
        else if (uri.includes("data:image/") ||
            uri.includes("data:application/")) {
            return uri;
        }
        else if (uri[0] === "Q") {
            return `https://ipfs.io/ipfs/${uri}`;
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
const Default = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = (0, exports.setupURI)(uri);
    if (!baseUrl && tokenId) {
        return yield (0, helpers_1.getWrappedNft)(nft, account, whitelisted);
    }
    const url = `${__1.proxy}${(0, exports.setupURI)(baseUrl)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        let { data } = response;
        data = yield (0, tezos_1.checkEmptyFromTezos)(data);
        let format = yield (0, helpers_1.getAssetFormat)(data.image);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
        console.error("error in default parser: ", error.message);
        return nft;
    }
});
exports.Default = Default;
// ! 0x0271c6853d4b2bdccd53aaf9edb66993e14d4cba
// ! 0x4508af04de4073b10a53ac416eb311f4a2ab9569
const ART_NFT_MATIC = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${__1.proxy}${data.image}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const EtherHead = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const AngelOfAether = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const Legend = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${__1.proxy}${(0, exports.setupURI)(data.image)}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
// ! AlphaBettyDoodle
const AlphaBettyDoodle = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${__1.proxy}${(0, exports.setupURI)(data.image)}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const Mabstronauts = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const RocketMonsters = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${__1.proxy}${(0, exports.setupURI)(data.image)}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const TheBlackMagic = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    // debugger;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
    const imageFormats = ["gif", "jpg", "jpeg", "png", "svg", "webp"];
    let nestedImage;
    try {
        const response = yield (0, axios_1.default)(url);
        let { data } = response;
        data = yield (0, tezos_1.checkEmptyFromTezos)(data);
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const CartelPunks = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const TreatNFT = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const newUrl = `${__1.proxy}https://treatdao.com/api/nft/${tokenId}`;
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
//0x2c83eaf6e460c673d92477a7c49eb4ecd04e1216
//c
// ! 0x2c83eaf6e460c673d92477a7c49eb4ecd04e1216
const IdoDirt = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const newUrl = `${__1.proxy}https://treatdao.com/api/nft/${tokenId}`;
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const Awokensages = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const Technomaniacs = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const ArcadeEdition = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
exports.ArcadeEdition = ArcadeEdition;
// ! 0x56d93767467c54bd86578666904087c4f16cdb7f
const Founders_Cabinet = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const TTAV = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const BoredGUtterCats = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const IDoDirtPolygon = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const ArsenalGame = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    if (!uri)
        console.log("NFT with no uri collection: ", collectionIdent, "tokenId: ", tokenId);
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const Mate = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const ABCBears = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    if (!uri)
        console.log("NFT with no uri collection: ", collectionIdent, "tokenId: ", tokenId);
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const TragicMonsters = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    if (!uri)
        console.log("NFT with no uri collection: ", collectionIdent, "tokenId: ", tokenId);
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
const SuperFatAcademy = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    if (!uri)
        console.log("NFT with no uri collection: ", collectionIdent, "tokenId: ", tokenId);
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
// ! 0xb94c3fd0016888bab09dbc229f9397294e828a54
// ! Forgotten Runes Comic
const ForgottenRunesComic = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${__1.proxy}${(0, exports.setupURI)(data.image)}`);
        const video = headers["content-type"].includes("video");
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: "",
                imageFormat: "",
                animation_url: (0, exports.setupURI)(data.image),
                animation_url_format: format,
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
exports.ForgottenRunesComic = ForgottenRunesComic;
// ! 0xd4c77e46b0266a7aca11083bcc86342f47bbdd04
// ! LilDickie
const LilDickie = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${__1.proxy}${(0, exports.setupURI)(data.image)}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
exports.LilDickie = LilDickie;
// ! 0x9304f22a5ab577119210d730e41755a6732e19f7
// ! TheCheeks
const TheCheeks = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${__1.proxy}${(0, exports.setupURI)(data.image)}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
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
exports.TheCheeks = TheCheeks;
// ! 0x028faf7eab0d8abb4a2d784206bfa98979041ffc
// ! Interesting CPeople
const InterestingCPeople = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
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
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: (0, exports.setupURI)(data.image),
                imageFormat: "png",
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
exports.InterestingCPeople = InterestingCPeople;
const Nagato = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const url = `${__1.proxy}${(0, exports.setupURI)(uri)}`;
    try {
        const response = __1.proxy
            ? (yield pool.addRequest(url))
            : yield (0, axios_1.default)(url);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data
                    ? (0, exports.setupURI)(data.image)
                    : `https://ipfs-nft-storage.com/ipfs/velasnagato/${tokenId}.png`,
                imageFormat: "png",
                attributes: data && data.attributes,
                description: data && data.description,
                name: data ? data.name : `Nagato #${tokenId}`,
            },
        };
        return nft;
    }
    catch (error) {
        return Object.assign(Object.assign({}, nft), (((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) === 429 ? { errorStatus: 429 } : {}));
    }
});
exports.Nagato = Nagato;
const OpenSEA = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield (0, axios_1.default)(`${__1.proxy}${uri.replace("0x{id}", tokenId)}`);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data.image,
                imageFormat: "png",
                attributes: data && data.attributes,
                description: data && data.description,
                animation_url: data.animation_url,
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
exports.OpenSEA = OpenSEA;
const ChainCaders = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f, _g, _h, _j;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield (0, axios_1.default)(`${__1.proxy}https://api.alturanft.com/api/item/56/${collectionIdent}/${tokenId}`);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data === null || data === void 0 ? void 0 : data.wrapped,
            metaData: {
                whitelisted,
                image: (_c = data === null || data === void 0 ? void 0 : data.item) === null || _c === void 0 ? void 0 : _c.imageUrl,
                imageFormat: (_e = (_d = data === null || data === void 0 ? void 0 : data.item) === null || _d === void 0 ? void 0 : _d.imageUrl) === null || _e === void 0 ? void 0 : _e.match(/(?:\.([^.]+))?$/)[1],
                name: (_f = data === null || data === void 0 ? void 0 : data.item) === null || _f === void 0 ? void 0 : _f.name,
                description: (_g = data === null || data === void 0 ? void 0 : data.item) === null || _g === void 0 ? void 0 : _g.description,
                collectionName: (_h = data === null || data === void 0 ? void 0 : data.item) === null || _h === void 0 ? void 0 : _h.collectionName,
                attributes: (_j = data === null || data === void 0 ? void 0 : data.item) === null || _j === void 0 ? void 0 : _j.properties,
                contractType: "1155",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.ChainCaders = ChainCaders;
const OPENSTORE = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId, contractType }, collectionIdent, uri, } = nft;
    try {
        const response = yield (0, axios_1.default)(contractType === "ERC1155"
            ? `${__1.proxy}https://api.opensea.io/api/v2/metadata/matic/0x2953399124F0cBB46d2CbACD8A89cF0599974963/${tokenId}`
            : `${__1.proxy}${uri.replace(/:\d+/, "").replace(".moralis", "")}`);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data && (0, exports.setupURI)(data.image_url || data.image),
                imageFormat: "png",
                description: data && data.description,
                animation_url: data && data.animation_url,
                name: data && data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.OPENSTORE = OPENSTORE;
const COZYCOSM = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const res = yield (0, axios_1.default)((0, exports.setupURI)(uri));
        const { data } = res;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: (0, exports.setupURI)(data.image),
                imageFormat: "png",
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
exports.COZYCOSM = COZYCOSM;
const DirtyLife = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield (0, axios_1.default)(`${__1.proxy}${uri}`).catch(() => ({
            data: null,
        }));
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data === null || data === void 0 ? void 0 : data.wrapped,
            metaData: {
                whitelisted,
                image: (0, exports.setupURI)(data === null || data === void 0 ? void 0 : data.image),
                imageFormat: "png",
                description: data === null || data === void 0 ? void 0 : data.description,
                name: data === null || data === void 0 ? void 0 : data.name,
                attributes: data === null || data === void 0 ? void 0 : data.attributes,
                collectionName: "DirtLife",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.DirtyLife = DirtyLife;
const MachineFi = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const data = JSON.parse(uri);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data && data.image,
                imageFormat: "gif",
                description: data && data.description,
                name: data && data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.MachineFi = MachineFi;
const TRSRNFT = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield (0, axios_1.default)(`${__1.proxy}${uri}`).catch(() => ({
            data: null,
        }));
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data && ((_k = data.data) === null || _k === void 0 ? void 0 : _k.image),
                imageFormat: "png",
                description: data && ((_l = data.data) === null || _l === void 0 ? void 0 : _l.description),
                name: data && ((_m = data.data) === null || _m === void 0 ? void 0 : _m.name),
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.TRSRNFT = TRSRNFT;
//WUBI
const WUBI = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _o;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = __1.proxy
            ? (yield pool.addRequest(__1.proxy + uri))
            : yield (0, axios_1.default)(uri);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data && (0, exports.setupURI)(data === null || data === void 0 ? void 0 : data.image),
                imageFormat: "png",
                description: data && (data === null || data === void 0 ? void 0 : data.description),
                name: data && (data === null || data === void 0 ? void 0 : data.name),
            },
        };
        return nft;
    }
    catch (error) {
        return Object.assign(Object.assign({}, nft), (((_o = error.response) === null || _o === void 0 ? void 0 : _o.status) === 429 ? { errorStatus: 429 } : {}));
    }
});
exports.WUBI = WUBI;
const PACK = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield (0, axios_1.default)(`${__1.proxy}${uri}`).catch(() => ({
            data: null,
        }));
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: (0, exports.setupURI)(data.image),
                imageFormat: "png",
                description: data.description,
                name: data.name,
                symbol: data.symbol,
                attributes: data.attributes,
                contractType: data.type,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.PACK = PACK;
const VelasOgPunks = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield (0, axios_1.default)(uri);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: (0, exports.setupURI)(data.image),
                imageFormat: "png",
                description: data.description,
                name: data.name,
                symbol: data.symbol || "PUNK",
                attributes: data.attributes,
                contractType: data.type || "721",
                collectionName: "VelasOGPunks",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.VelasOgPunks = VelasOgPunks;
const Drifters = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _p;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = __1.proxy
            ? (yield pool.addRequest(__1.proxy + uri))
            : yield (0, axios_1.default)(uri);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: `https://drifters-nft.s3.amazonaws.com/${tokenId}.png`,
                imageFormat: "png",
                description: data === null || data === void 0 ? void 0 : data.description,
                name: data === null || data === void 0 ? void 0 : data.name,
                symbol: (data === null || data === void 0 ? void 0 : data.symbol) || "DRIFTER",
                attributes: data === null || data === void 0 ? void 0 : data.attributes,
                contractType: (data === null || data === void 0 ? void 0 : data.type) || "721",
                collectionName: "Drifters",
            },
        };
        return nft;
    }
    catch (error) {
        return Object.assign(Object.assign({}, nft), (((_p = error.response) === null || _p === void 0 ? void 0 : _p.status) === 429 ? { errorStatus: 429 } : {}));
    }
});
exports.Drifters = Drifters;
const Weed = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _q;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    if (__1.proxy)
        return nft;
    try {
        const response = yield (0, axios_1.default)(uri);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            forceCache: true,
            metaData: {
                whitelisted,
                image: `https://nft.weedcommerce.info/metadata/${tokenId}.png`,
                imageFormat: "png",
                description: data === null || data === void 0 ? void 0 : data.description,
                name: data === null || data === void 0 ? void 0 : data.name,
                symbol: (data === null || data === void 0 ? void 0 : data.symbol) || "EOTM",
                attributes: data === null || data === void 0 ? void 0 : data.attributes,
                collectionName: "Employees of the Metaverse",
            },
        };
        return nft;
    }
    catch (error) {
        return Object.assign(Object.assign({}, nft), (((_q = error.response) === null || _q === void 0 ? void 0 : _q.status) === 429 ? { errorStatus: 429 } : {}));
    }
});
exports.Weed = Weed;
const Cities = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _r;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = __1.proxy
            ? (yield pool.addRequest(__1.proxy + uri))
            : yield (0, axios_1.default)(uri);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data && (0, exports.setupURI)(data.image),
                imageFormat: "png",
                description: data && data.description,
                name: data && data.name,
                symbol: (data && data.symbol) || "CFOD",
                attributes: data && data.attributes,
                contractType: (data && data.type) || "721",
                collectionName: "Cities From Our Dreams",
            },
        };
        return nft;
    }
    catch (error) {
        return Object.assign(Object.assign({}, nft), (((_r = error.response) === null || _r === void 0 ? void 0 : _r.status) === 429 ? { errorStatus: 429 } : {}));
    }
});
exports.Cities = Cities;
exports.Mountains = exports.Cities;
const WrappedXPNET = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        let { data } = yield (0, axios_1.default)(`${__1.proxy}${uri}`).catch(() => ({
            data: null,
        }));
        data = yield (0, tezos_1.checkEmptyFromTezos)(data);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data && data.wrapped,
            metaData: {
                whitelisted,
                image: data && (0, exports.setupURI)(data.image),
                imageFormat: "png",
                description: data && (data === null || data === void 0 ? void 0 : data.description),
                name: data && (data === null || data === void 0 ? void 0 : data.name),
                attributes: data && (data === null || data === void 0 ? void 0 : data.attributes),
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.WrappedXPNET = WrappedXPNET;
//"{"name": "MachineFi NFT", "description": "The MachineFi NFT.", "image": "https://machinefi.com/nft/image/6505"}"