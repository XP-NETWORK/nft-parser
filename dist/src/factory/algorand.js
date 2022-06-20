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
exports.LikeD00dles = exports.Default = exports.algorandParser = void 0;
const axios_1 = __importDefault(require("axios"));
const _1 = require(".");
const erc721 = require("../../build/factory/ABIs/ERC721.json");
const Contract = require("web3-eth-contract");
const proxy = "https://sheltered-crag-76748.herokuapp.com/";
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
        default:
            parsed = yield (0, exports.LikeD00dles)(nft, account, whitelisted);
            break;
    }
    return parsed;
});
exports.algorandParser = algorandParser;
// ! COLLECTIONS
// ! Default
const Default = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${(0, _1.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const { headers } = yield (0, axios_1.default)(`${proxy}${(0, _1.setupURI)(data.image)}`);
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
    const baseUrl = uri;
    const url = `${proxy}${(0, _1.setupURI)(uri)}`;
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
