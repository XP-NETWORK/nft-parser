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
exports.hederaParser = void 0;
const axios_1 = __importDefault(require("axios"));
const _1 = require(".");
const __1 = require("..");
const index_1 = require("./index");
const __2 = require("..");
const cheerio = require("cherio");
const hederaParser = (collectionIdent, nft, account, whitelisted, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    switch (true) {
        case /(0x000000000000000000000000000000000008f387)/.test(collectionIdent):
            parsed = yield BRONZE(nft, account, whitelisted);
            break;
        default:
            parsed = yield (0, index_1.Default)(nft, account, whitelisted);
            break;
    }
    return parsed;
});
exports.hederaParser = hederaParser;
const BRONZE = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = (_a = (yield (0, axios_1.default)(`${__1.proxy}${(0, _1.setupURI)(uri)}`))) === null || _a === void 0 ? void 0 : _a.data;
        if (!response)
            throw new Error("Could not fetch hedera nft::BRONZE");
        let img = ((_b = response.image) === null || _b === void 0 ? void 0 : _b.description)
            ? (_c = (yield (0, axios_1.default)(`${__1.proxy}${(0, _1.setupURI)(response.image.description)}`))) === null || _c === void 0 ? void 0 : _c.data
            : "";
        if (img) {
            const $ = cheerio.load(img);
            const link = $("#content  table  tbody  tr:first-child td:nth-child(2) > a").attr("href");
            img = "https://cloudflare-ipfs.com" + link;
        }
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                name: response.name,
                description: (_d = response.description) === null || _d === void 0 ? void 0 : _d.description,
                image: img,
                imageFormat: (0, __2.extractType)(img),
                whitelisted: true,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
