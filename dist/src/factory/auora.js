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
exports.auroraParser = void 0;
const axios_1 = __importDefault(require("axios"));
const __1 = require("..");
const index_1 = require("./index");
const cheerio = require("cherio");
const auroraParser = (collectionIdent, nft, account, whitelisted, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    switch (true) {
        case /(0xa5DCBdbaB9a9268f754D80C9d98A47Fd4EbE2b2e|0xF4823Ffa8133f6B27c7e3A5218B40a9087B6d2c7|0x1797C36a07D234DC9e342fb828031f7Ed297e75F|0x5BF4017DFe679c13910236427509fd088f8D6138|0x88976c2A0AF6f969d51E2e757AfD5bDaDaC5D6C5|0x486a92035a73de83f393DBfFa2C1a72e047203E9)/.test(collectionIdent):
            parsed = yield Virtual(nft, account, whitelisted);
            break;
        default:
            parsed = yield (0, index_1.Default)(nft, account, whitelisted);
            break;
    }
    return parsed;
});
exports.auroraParser = auroraParser;
const Virtual = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield (0, axios_1.default)(`${__1.proxy}https://explorer.mainnet.aurora.dev/token/${collectionIdent}/instance/${tokenId}/metadata`);
        const $ = cheerio.load(response.data);
        const code = $(".card code").text();
        const collection = $(".card .card-body .card-title a").text();
        const meta = JSON.parse(code);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: meta && meta.wrapped,
            metaData: {
                whitelisted,
                image: meta && meta.image,
                imageFormat: "png",
                attributes: meta && meta.attributes,
                description: meta && meta.description,
                animation_url: meta && meta["animation_url"],
                name: meta && meta.name,
                collectionName: collection || "Virtual Reality 3D NFTs",
                symbol: "vr3DNFTs",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
