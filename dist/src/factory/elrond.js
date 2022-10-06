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
exports.Default = exports.HOKI = exports.WrappedXPNET = exports.NBERGS = exports.ALIEN = exports.KINGSGUARD = exports.ORC = exports.MEDUSA = exports.INNOVATOR = exports.APOPHIS = exports.DRIFTERS = exports.AERMES = exports.DEFAULT = exports.elrondParser = void 0;
const axios_1 = __importDefault(require("axios"));
const __1 = require("..");
const _1 = require(".");
const telegram_1 = require("../../tools/telegram");
const __2 = require("..");
const elrondParser = (collectionIdent, nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    switch (collectionIdent) {
        case "AERMES-ac9886": {
            parsed = yield (0, exports.AERMES)(nft, account, whitelisted);
            break;
        }
        case "DRIFTERS-efd96c": {
            parsed = yield (0, exports.DRIFTERS)(nft, account, whitelisted);
            break;
        }
        case "NIFTYREX-d8c812": {
            parsed = yield (0, exports.DRIFTERS)(nft, account, whitelisted);
            break;
        }
        case "INNOVATOR-fca3a7": {
            parsed = yield (0, exports.INNOVATOR)(nft, account, whitelisted);
            break;
        }
        case "CGPASS-73ac68": {
            parsed = yield (0, exports.MEDUSA)(nft, account, whitelisted);
            break;
        }
        case "ORC-ef544d": {
            parsed = yield (0, exports.ORC)(nft, account, whitelisted);
            break;
        }
        case "STRAYCATS-b079a7": {
            parsed = yield (0, exports.WrappedXPNET)(nft, account, whitelisted);
            break;
        }
        case "PMONC-4032bc": {
            parsed = yield (0, exports.WrappedXPNET)(nft, account, whitelisted);
            break;
        }
        case "TAKANNE-3db244": {
            parsed = yield (0, exports.APOPHIS)(nft, account, whitelisted);
            break;
        }
        case "KINGSGUARD-8e5d07": {
            parsed = yield (0, exports.KINGSGUARD)(nft, account, whitelisted);
            break;
        }
        case "ALIEN-a499ab": {
            parsed = yield (0, exports.ALIEN)(nft, account, whitelisted);
            break;
        }
        case "HOKIZUKI-2fe117": {
            parsed = yield (0, exports.HOKI)(nft, account, whitelisted);
            break;
        }
        case "NBERGS-139351": {
            parsed = yield (0, exports.NBERGS)(nft, account, whitelisted);
            break;
        }
        default:
            parsed = yield (0, exports.DEFAULT)(nft, account, whitelisted);
            break;
    }
    return parsed;
});
exports.elrondParser = elrondParser;
const DEFAULT = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const format = yield (0, __1.getAssetFormat)((0, _1.setupURI)(uri));
        //const { data } = await axios(uri);
        //const headers = data.headers;
        // const format = headers["content-type"].slice(
        // headers["content-type"].lastIndexOf("/") + 1
        //);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            //wrapped: data.wrapped,
            metaData: {
                whitelisted,
                image: format.includes("json")
                    ? uri.replace(".json", ".png")
                    : format.includes("png")
                        ? uri
                        : format.includes("mp4")
                            ? ""
                            : "",
                imageFormat: "png",
                animation_url: format.includes("png")
                    ? ""
                    : format.includes("json")
                        ? uri.replace(".json", ".mp4")
                        : format.includes("mp4")
                            ? uri
                            : "",
                animation_url_format: "mp4",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) || error);
        yield (0, telegram_1.sendTelegramMessage)(nft);
        return Object.assign(Object.assign({}, nft), (((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
exports.DEFAULT = DEFAULT;
const AERMES = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                whitelisted,
                image: "",
                imageFormat: "",
                animation_url: uri,
                animation_url_format: "mp4",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.AERMES = AERMES;
const DRIFTERS = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                whitelisted,
                image: uri.replace(".json", ".png"),
                imageFormat: "png",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.DRIFTERS = DRIFTERS;
const APOPHIS = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                whitelisted,
                image: uri.replace(".json", ".png"),
                imageFormat: "png",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.APOPHIS = APOPHIS;
const INNOVATOR = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield (0, axios_1.default)(uri);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data.wrapped,
            metaData: {
                whitelisted,
                image: data.image,
                imageFormat: "png",
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
exports.INNOVATOR = INNOVATOR;
const MEDUSA = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield (0, axios_1.default)(uri);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data.wrapped,
            metaData: {
                whitelisted,
                image: (0, _1.setupURI)(data.image),
                imageFormat: "png",
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
exports.MEDUSA = MEDUSA;
const ORC = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield (0, axios_1.default)(__2.proxy + uri);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data.wrapped,
            metaData: {
                whitelisted,
                image: uri.replace(".json", ".png"),
                imageFormat: "png",
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
exports.ORC = ORC;
const KINGSGUARD = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        //const { data } = await axios(proxy + uri);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                whitelisted,
                image: `https://media.elrond.com/nfts/asset/QmbtT4ca7TjE8fKd9ufkNm3H2sD9caz4GZ7VPn76Burx4J/${(_c = uri
                    .match(/([^\/]+$)/)) === null || _c === void 0 ? void 0 : _c.at(0).replace(/\D+/, "")}.jpg`,
                imageFormat: "jpg",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.KINGSGUARD = KINGSGUARD;
//KINGSGUARD
exports.ALIEN = exports.ORC;
///https://ipfs.io/ipfs/QmcnUiaXw3Gjy1cXDnXTnhWahW2h4kqJiXp88wya9yJYj9/5437.json
const NBERGS = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    console.log("dora");
    try {
        const { data } = yield (0, axios_1.default)(__2.proxy + uri);
        console.log(data);
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
                image: `https://ipfs.io/ipfs/QmcnUiaXw3Gjy1cXDnXTnhWahW2h4kqJiXp88wya9yJYj9/${(_d = uri
                    .match(/\d+(?=\.json)/)) === null || _d === void 0 ? void 0 : _d.at(0)}.png`,
                imageFormat: "png",
                name: data === null || data === void 0 ? void 0 : data.name,
                attributes: data === null || data === void 0 ? void 0 : data.attributes,
                description: data === null || data === void 0 ? void 0 : data.description,
                collectionName: "Nicebergs NFT",
            },
        };
        return nft;
    }
    catch (error) {
        console.log(error);
        return Object.assign(Object.assign({}, nft), (((_e = error.response) === null || _e === void 0 ? void 0 : _e.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
exports.NBERGS = NBERGS;
const WrappedXPNET = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h, _j;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield (0, axios_1.default)(__2.proxy + uri);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data.wrapped,
            metaData: Object.assign(Object.assign({ whitelisted, image: data.image, imageFormat: (_g = (_f = data.image) === null || _f === void 0 ? void 0 : _f.match(/\.([^.]*)$/)) === null || _g === void 0 ? void 0 : _g.at(1), name: data.name, attributes: data.attributes, description: data.description }, (data.animation_url ? { animation_url: data.animation_url } : {})), (data.animation_url
                ? {
                    animation_url_format: (_j = (_h = data.animation_url) === null || _h === void 0 ? void 0 : _h.match(/\.([^.]*)$/)) === null || _j === void 0 ? void 0 : _j.at(1),
                }
                : {})),
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.WrappedXPNET = WrappedXPNET;
const HOKI = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m, _o;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield (0, axios_1.default)(__2.proxy + uri);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data.wrapped,
            metaData: Object.assign(Object.assign({ whitelisted, image: (0, _1.setupURI)(data.image.replace("NewUriToReplace", "QmcnpaWrFmJjiq7nSnomyogsL5CVHjmTL1HLFeKeTz3Fia")), imageFormat: (_l = (_k = data.image) === null || _k === void 0 ? void 0 : _k.match(/\.([^.]*)$/)) === null || _l === void 0 ? void 0 : _l.at(1), name: data.name, attributes: data.attributes, description: data.description }, (data.animation_url ? { animation_url: data.animation_url } : {})), (data.animation_url
                ? {
                    animation_url_format: (_o = (_m = data.animation_url) === null || _m === void 0 ? void 0 : _m.match(/\.([^.]*)$/)) === null || _o === void 0 ? void 0 : _o.at(1),
                }
                : {})),
        };
        return nft;
    }
    catch (error) {
        return Object.assign(Object.assign({}, nft), { errorStatus: 429 });
    }
});
exports.HOKI = HOKI;
const Default = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _p, _q, _r, _s, _t;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    console.log("ds");
    try {
        let data;
        if (/(png|jpe?g)/.test(uri)) {
            data = {
                image: (0, _1.setupURI)(uri),
            };
        }
        else {
            const res = yield (0, axios_1.default)(__2.proxy + uri);
            data = res.data;
        }
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data.wrapped,
            metaData: Object.assign(Object.assign({ whitelisted, image: data.image, imageFormat: (_q = (_p = data.image) === null || _p === void 0 ? void 0 : _p.match(/\.([^.]*)$/)) === null || _q === void 0 ? void 0 : _q.at(1), name: data.name, attributes: data.attributes, description: data.description }, (data.animation_url ? { animation_url: data.animation_url } : {})), (data.animation_url
                ? {
                    animation_url_format: (_s = (_r = data.animation_url) === null || _r === void 0 ? void 0 : _r.match(/\.([^.]*)$/)) === null || _s === void 0 ? void 0 : _s.at(1),
                }
                : {})),
        };
        return nft;
    }
    catch (error) {
        console.error(((_t = error === null || error === void 0 ? void 0 : error.response) === null || _t === void 0 ? void 0 : _t.status) || error);
        return nft;
    }
});
exports.Default = Default;
