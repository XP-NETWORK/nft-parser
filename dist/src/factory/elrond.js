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
exports.Default = exports.WrappedXPNET = exports.ALIEN = exports.KINGSGUARD = exports.ORC = exports.MEDUSA = exports.INNOVATOR = exports.APOPHIS = exports.DRIFTERS = exports.AERMES = exports.DEFAULT = void 0;
const axios_1 = __importDefault(require("axios"));
const _1 = require(".");
const DEFAULT = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield (0, axios_1.default)(uri);
        const headers = data.headers;
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
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
        console.error(error);
        return nft;
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
        const { data } = yield (0, axios_1.default)(_1.proxy + uri);
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
    var _a;
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
                image: `https://media.elrond.com/nfts/asset/QmbtT4ca7TjE8fKd9ufkNm3H2sD9caz4GZ7VPn76Burx4J/${(_a = uri
                    .match(/([^\/]+$)/)) === null || _a === void 0 ? void 0 : _a.at(0).replace(/\D+/, "")}.jpg`,
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
const WrappedXPNET = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield (0, axios_1.default)(_1.proxy + uri);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data.wrapped,
            metaData: Object.assign(Object.assign({ whitelisted, image: data.image, imageFormat: (_c = (_b = data.image) === null || _b === void 0 ? void 0 : _b.match(/\.([^.]*)$/)) === null || _c === void 0 ? void 0 : _c.at(1), name: data.name, attributes: data.attributes, description: data.description }, (data.animation_url
                ? { animation_url: data.animation_url }
                : {})), (data.animation_url
                ? {
                    animation_url_format: (_e = (_d = data.animation_url) === null || _d === void 0 ? void 0 : _d.match(/\.([^.]*)$/)) === null || _e === void 0 ? void 0 : _e.at(1),
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
const Default = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h, _j;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        let data;
        if (/(png|jpe?g)/.test(uri)) {
            data = {
                image: (0, _1.setupURI)(uri),
            };
        }
        else {
            const res = yield (0, axios_1.default)(_1.proxy + uri);
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
            metaData: Object.assign(Object.assign({ whitelisted, image: data.image, imageFormat: (_g = (_f = data.image) === null || _f === void 0 ? void 0 : _f.match(/\.([^.]*)$/)) === null || _g === void 0 ? void 0 : _g.at(1), name: data.name, attributes: data.attributes, description: data.description }, (data.animation_url
                ? { animation_url: data.animation_url }
                : {})), (data.animation_url
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
exports.Default = Default;
