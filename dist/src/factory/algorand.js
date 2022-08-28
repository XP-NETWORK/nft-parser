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
exports.CBCG = exports.SMC = exports.Alchemon = exports.WarriorCroc = exports.LikeD00dles = exports.Default = exports.algorandParser = void 0;
const axios_1 = __importDefault(require("axios"));
const __1 = require("..");
const _1 = require(".");
const __2 = require("..");
const algorandParser = (collectionIdent, nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    switch (true) {
        case collectionIdent.includes("D00dles"):
            collectionIdent = "D00dles";
            break;
        case collectionIdent.includes("Donkey"):
            collectionIdent = "Donkey";
            break;
        case collectionIdent.includes("Algo Rocket"):
            collectionIdent = "Algo Rocket";
            break;
        case collectionIdent.includes("ALGO WEIRD AXEL"):
            collectionIdent = "ALGO WEIRD AXEL";
            break;
        case collectionIdent.includes("Warrior Croc"):
            collectionIdent = "Warrior Croc";
            break;
        case collectionIdent.includes("Al Goanna"):
            collectionIdent = "Al Goanna";
            break;
        case collectionIdent.includes("BrontosEYE"):
            collectionIdent = "BrontosEYE";
            break;
        case collectionIdent.includes("Shep"):
            collectionIdent = "Shep";
            break;
        case collectionIdent.includes("RaptorEYE"):
            collectionIdent = "RaptorEYE";
            break;
        case collectionIdent.includes("The Psychedelic Forest"):
            collectionIdent = "The Psychedelic Forest";
            break;
        case collectionIdent.includes("Dead Putin Society"):
            collectionIdent = "Dead Putin Society";
            break;
        case collectionIdent.includes("AlgoSeas Pirate"):
            collectionIdent = "AlgoSeas Pirate";
            break;
        case collectionIdent.includes("Alchemon"):
            collectionIdent = "Alchemon";
            break;
        case collectionIdent.includes("SMC"):
            collectionIdent = "SMC";
            break;
        case collectionIdent.includes("C.B.C.G"):
            collectionIdent = "C.B.C.G";
            break;
        //C.B.C.G
        default:
            break;
    }
    let parsed;
    switch (collectionIdent) {
        case "D00dles":
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
        case "Donkey":
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
        case "Algo Rocket":
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
        case "ALGO WEIRD AXEL":
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
        case "Warrior Croc":
            parsed = yield (0, exports.WarriorCroc)(nft, account, whitelisted);
            break;
        case "Al Goanna":
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
        case "BrontosEYE":
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
        case "Number 512":
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
        case "Shep":
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
        case "The Psychedelic Forest":
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
        case "RaptorEYE":
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
        case "Dead Putin Society":
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
        case "LION'S BEAUTY":
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
        case "Floating ghost":
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
        case "AlgoSeas Pirate":
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
        case "Alchemon":
            parsed = yield (0, exports.Alchemon)(nft, account, whitelisted);
            break;
        case "SMC":
            parsed = yield (0, exports.SMC)(nft, account, whitelisted);
            break;
        case "C.B.C.G":
            parsed = yield (0, exports.CBCG)(nft, account, whitelisted);
            break;
        default:
            parsed = yield (0, exports.Default)(nft, account, whitelisted);
            break;
    }
    return parsed;
});
exports.algorandParser = algorandParser;
// ! COLLECTIONS
// ! Default
const Default = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const url = `${__2.proxy}${(0, _1.setupURI)(uri)}`;
    console.log(url, "url");
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const format = yield (0, __1.getAssetFormat)((0, _1.setupURI)(data.image));
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
exports.Default = Default;
// ! "D00dles"
const LikeD00dles = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const url = `${__2.proxy}${(0, _1.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data, headers } = response;
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
                image: (0, _1.setupURI)(url),
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
exports.LikeD00dles = LikeD00dles;
// ! Warrior Croc
const WarriorCroc = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    // debugger;
    const url = `${__2.proxy}${(0, _1.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const format = data["image_mime_type"].slice(data["image_mime_type"].lastIndexOf("/") + 1);
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
exports.WarriorCroc = WarriorCroc;
// ! Alchemon
const Alchemon = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__2.proxy}${(0, _1.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data, headers } = response;
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
                image: "",
                imageFormat: "",
                animation_url: (0, _1.setupURI)(uri),
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
exports.Alchemon = Alchemon;
const SMC = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId, name }, collectionIdent, uri, } = nft;
    const [attrs, foramt] = yield Promise.all([
        (0, axios_1.default)(__2.proxy + `https://api.algoxnft.com/v1/assets/${tokenId}/arc69`),
        (0, __1.getAssetFormat)((0, _1.setupURI)(uri)),
    ]);
    const { data } = attrs;
    try {
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: null,
            metaData: {
                whitelisted,
                image: (0, _1.setupURI)(uri),
                imageFormat: foramt,
                name,
                symbol: "SMC",
                collectionName: "SMC",
                attributes: data === null || data === void 0 ? void 0 : data.attributes,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.SMC = SMC;
const CBCG = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId, name }, collectionIdent, uri, } = nft;
    /* const attrs = await axios(
      proxy + `https://api.algoxnft.com/v1/assets/${tokenId}/arc69`
    );*/
    const [attrs, foramt] = yield Promise.all([
        (0, axios_1.default)(__2.proxy + `https://api.algoxnft.com/v1/assets/${tokenId}/arc69`),
        (0, __1.getAssetFormat)((0, _1.setupURI)(uri)),
    ]);
    const { data } = attrs;
    try {
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: null,
            metaData: {
                whitelisted,
                image: (0, _1.setupURI)(uri),
                imageFormat: foramt,
                name,
                symbol: "C.B.C.G",
                collectionName: "C.B.C.G",
                attributes: data === null || data === void 0 ? void 0 : data.attributes,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
exports.CBCG = CBCG;
