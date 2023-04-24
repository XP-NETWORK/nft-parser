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
exports.tryPinataWrapper = exports.getAssetFormat = exports.extractType = exports.isAsset = exports.getWrappedNft = void 0;
const axios_1 = __importDefault(require("axios"));
const factory_1 = require("../src/factory");
const src_1 = require("../src");
const file_type_1 = require("file-type");
const getWrappedNft = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const res = yield (0, axios_1.default)(`https://nft.xp.network/w/${tokenId}`);
    const { data } = res;
    return {
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
            image: (0, factory_1.setupURI)(data === null || data === void 0 ? void 0 : data.image),
            imageFormat: (_a = data === null || data === void 0 ? void 0 : data.image) === null || _a === void 0 ? void 0 : _a.match(/(?:\.([^.]+))?$/)[1],
            attributes: data === null || data === void 0 ? void 0 : data.attributes,
            description: data === null || data === void 0 ? void 0 : data.description,
            name: data === null || data === void 0 ? void 0 : data.name,
        },
    };
});
exports.getWrappedNft = getWrappedNft;
const isAsset = (imageUri) => /(\.png$|\.jpe?g$|\.gif$|\.mp4$|\.avi$|\.webm$|\.svg$|\.mov$|\.mkv$|\.flv$|\.wmv$|\.ogg$)/.test(imageUri);
exports.isAsset = isAsset;
const extractType = (imageUri) => { var _a; return ((_a = imageUri.match(/(?:\.([^.]+))?$/)) === null || _a === void 0 ? void 0 : _a.at(1)) || ""; };
exports.extractType = extractType;
const getAssetFormat = (imageUri) => __awaiter(void 0, void 0, void 0, function* () {
    if (!imageUri) {
        throw new Error("no url:");
    }
    let format = "";
    try {
        if ((0, exports.isAsset)(imageUri)) {
            format = (0, exports.extractType)(imageUri);
        }
        else {
            if (src_1.proxy) {
                const { headers } = yield (0, axios_1.default)(`${src_1.proxy}${(0, factory_1.setupURI)(imageUri)}`);
                format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
            }
            else {
                format = yield new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                    var _b;
                    const stream = yield (0, exports.tryPinataWrapper)((url) => axios_1.default.get(url, {
                        responseType: "stream",
                        timeout: 3000,
                    }))((0, factory_1.setupURI)(imageUri)).catch((e) => reject(e));
                    (_b = stream === null || stream === void 0 ? void 0 : stream.data) === null || _b === void 0 ? void 0 : _b.on("data", (chunk) => __awaiter(void 0, void 0, void 0, function* () {
                        var _c;
                        const res = yield (0, file_type_1.fromBuffer)(chunk).catch((e) => reject(e));
                        (_c = stream === null || stream === void 0 ? void 0 : stream.data) === null || _c === void 0 ? void 0 : _c.destroy();
                        if ((res === null || res === void 0 ? void 0 : res.ext) === "heic")
                            return reject("heic format");
                        resolve((res === null || res === void 0 ? void 0 : res.ext) || "");
                    }));
                }));
            }
        }
        return format;
    }
    catch (e) {
        console.log(e.message, "reading format");
        throw e;
    }
});
exports.getAssetFormat = getAssetFormat;
const retryCodes = "(429|503)";
const tryPinataWrapper = (cb) => (url) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cb(src_1.proxy + url).catch((e) => {
        if (new RegExp(retryCodes).test(e.message) &&
            /^https:\/\/ipfs.io/.test(url)) {
            return cb(src_1.proxy +
                url.replace(/^https:\/\/ipfs.io/, "https://xpnetwork.infura-ipfs.io"));
        }
        throw e;
    });
});
exports.tryPinataWrapper = tryPinataWrapper;
