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
exports.Rarible = exports.TributeTezoTrooperz = exports.RocketMonsters = exports.Default = exports.tezosParser = exports.checkEmptyFromTezos = void 0;
const _1 = require(".");
const utils_1 = require("@taquito/utils");
const taquito_1 = require("@taquito/taquito");
const axios_1 = __importDefault(require("axios"));
const __1 = require("..");
const helpers_1 = require("../../tools/helpers");
const tezos = new taquito_1.TezosToolkit("https://mainnet.smartpy.io/");
const checkEmptyFromTezos = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!(data === null || data === void 0 ? void 0 : data.image) && ((_a = data === null || data === void 0 ? void 0 : data.wrapped) === null || _a === void 0 ? void 0 : _a.origin) === "18") {
        try {
            const contract = yield tezos.contract.at((_b = data === null || data === void 0 ? void 0 : data.wrapped) === null || _b === void 0 ? void 0 : _b.contract);
            const storage = (yield contract.storage());
            const tokenStorage = yield storage.token_metadata.get((_c = data === null || data === void 0 ? void 0 : data.wrapped) === null || _c === void 0 ? void 0 : _c.tokenId);
            const nativeUrl = (0, utils_1.bytes2Char)(tokenStorage.token_info.get(""));
            const nativeMeta = yield (0, axios_1.default)(`${(0, _1.setupURI)(nativeUrl)}`).catch(() => ({
                data: null,
            }));
            return Object.assign(Object.assign({}, data), { image: (_d = nativeMeta === null || nativeMeta === void 0 ? void 0 : nativeMeta.data) === null || _d === void 0 ? void 0 : _d.displayUri, name: (_e = nativeMeta === null || nativeMeta === void 0 ? void 0 : nativeMeta.data) === null || _e === void 0 ? void 0 : _e.name, description: (_f = nativeMeta === null || nativeMeta === void 0 ? void 0 : nativeMeta.data) === null || _f === void 0 ? void 0 : _f.description, symbol: (_g = nativeMeta === null || nativeMeta === void 0 ? void 0 : nativeMeta.data) === null || _g === void 0 ? void 0 : _g.symbol });
        }
        catch (e) {
            console.log("in checkEmptyFromTezos");
            return data;
        }
    }
    else {
        return data;
    }
});
exports.checkEmptyFromTezos = checkEmptyFromTezos;
const getMetadata = (nft, account = "", whitelisted = true) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("URI 1", __1.proxy + (0, _1.setupURI)(nft.uri));
    console.log("URI 2", __1.proxy + (0, _1.setupURI)(nft.uri, true));
    let res;
    try {
        res = yield (0, axios_1.default)(__1.proxy + (0, _1.setupURI)(nft.uri), { timeout: 10000 });
    }
    catch (ex) {
        res = yield (0, axios_1.default)(__1.proxy + (0, _1.setupURI)(nft.uri, true), { timeout: 10000 });
    }
    const { data } = res;
    console.log("tezos data", data);
    const parsed = {
        native: nft.native,
        chainId: nft.native.chainId,
        tokenId: nft.native.tokenId,
        contract: nft.native.contract,
        uri: nft.uri,
        owner: account,
        collectionIdent: nft.collectionIdent,
        metaData: {
            whitelisted,
            image: (0, _1.setupURI)(data.displayUri || data.image),
            imageFormat: yield (0, helpers_1.getAssetFormat)((0, _1.setupURI)(data.displayUri || data.image)),
            attributes: data === null || data === void 0 ? void 0 : data.attributes,
            description: data === null || data === void 0 ? void 0 : data.description,
            name: data === null || data === void 0 ? void 0 : data.name,
            collectionName: data === null || data === void 0 ? void 0 : data.type,
        },
    };
    console.log("PARSED", parsed);
    return parsed;
});
const tezosParser = (collectionIdent, nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native: { contract, tokenId, chainId }, uri, } = nft;
    let parsed;
    switch (collectionIdent) {
        case "KT18pPEPFqiP472bWxmxvN1NmMMFZVhojwEA":
            parsed = yield (0, exports.TributeTezoTrooperz)(nft, account, whitelisted);
            break;
        case "KT18pVpRXKPY2c4U2yFEGSH3ZnhB2kL8kwXS":
            parsed = yield (0, exports.Rarible)(nft, account, whitelisted);
            break;
        case "KT1RCzrLhBpdKXkyasKGpDTCcdbBTipUk77x":
            parsed = nft.native.meta
                ? yield (0, exports.Default)(nft, account, whitelisted)
                : yield (0, exports.RocketMonsters)(nft, account, whitelisted);
            break;
        default:
            parsed = yield (0, exports.Default)(nft, account, whitelisted);
            break;
    }
    return parsed;
});
exports.tezosParser = tezosParser;
const Default = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    if (!((_h = nft.native.meta) === null || _h === void 0 ? void 0 : _h.token)) {
        return yield getMetadata(nft, account, whitelisted).catch(() => nft);
    }
    const { collectionIdent, uri, native, native: { tokenId, chainId, contract, meta: { token: { metadata: { displayUri, image, description, attributes, name, symbol, formats, }, }, }, }, } = nft;
    const mimeType = Array.isArray(formats) ? formats[0].mimeType : formats;
    const format = mimeType === null || mimeType === void 0 ? void 0 : mimeType.slice(mimeType.lastIndexOf("/") + 1);
    const parsed = {
        native,
        chainId,
        tokenId,
        contract,
        uri,
        owner: account,
        collectionIdent,
        metaData: {
            whitelisted,
            image: (0, _1.setupURI)(displayUri || image),
            imageFormat: format,
            attributes,
            symbol,
            description,
            name,
        },
    };
    return parsed;
});
exports.Default = Default;
const RocketMonsters = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { collectionIdent, uri, native, native: { tokenId, chainId, contract }, } = nft;
    const res = yield (0, axios_1.default)(__1.proxy + (0, _1.setupURI)(uri));
    const { data } = res;
    const parsed = {
        native,
        chainId,
        tokenId,
        contract,
        uri: nft.uri,
        owner: account,
        collectionIdent: nft.collectionIdent,
        metaData: {
            whitelisted,
            image: (0, _1.setupURI)(data.displayUri),
            imageFormat: "png",
            attributes: data === null || data === void 0 ? void 0 : data.attributes,
            description: data === null || data === void 0 ? void 0 : data.description,
            name: data === null || data === void 0 ? void 0 : data.name,
            collectionName: data === null || data === void 0 ? void 0 : data.collectionName,
            symbol: data === null || data === void 0 ? void 0 : data.symbol,
        },
    };
    return parsed;
});
exports.RocketMonsters = RocketMonsters;
// ! "KT18pPEPFqiP472bWxmxvN1NmMMFZVhojwEA"
const TributeTezoTrooperz = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { collectionIdent, uri, native, native: { tokenId, chainId, contract, meta: { token: { metadata: { description, attributes, formats, image, name, symbol }, }, }, }, } = nft;
    const mimeType = formats[0].mimeType;
    const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
    const parsed = {
        native,
        chainId,
        tokenId,
        contract,
        uri,
        owner: account,
        collectionIdent,
        metaData: {
            whitelisted,
            image: (0, _1.setupURI)(image),
            imageFormat: format,
            attributes,
            symbol,
            description,
            name,
        },
    };
    return parsed;
});
exports.TributeTezoTrooperz = TributeTezoTrooperz;
// ! KT18pVpRXKPY2c4U2yFEGSH3ZnhB2kL8kwXS
const Rarible = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { collectionIdent, uri, native, native: { tokenId, chainId, contract, meta: { token: { metadata: { description, attributes, displayUri, artifactUri, name, symbol, }, }, }, }, } = nft;
    const parsed = {
        native,
        chainId,
        tokenId,
        contract,
        uri,
        owner: account,
        collectionIdent,
        metaData: {
            whitelisted,
            image: (0, _1.setupURI)(displayUri),
            imageFormat: "gif",
            animation_url: (0, _1.setupURI)(artifactUri),
            animation_url_format: "mp4",
            attributes,
            symbol,
            description,
            name,
        },
    };
    return parsed;
});
exports.Rarible = Rarible;
