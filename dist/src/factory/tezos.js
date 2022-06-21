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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TributeTezoTrooperz = exports.Default = exports.tezosParser = void 0;
const _1 = require(".");
const tezosParser = (collectionIdent, nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native: { contract, tokenId, chainId }, uri, } = nft;
    let parsed;
    switch (collectionIdent) {
        case "KT18pPEPFqiP472bWxmxvN1NmMMFZVhojwEA":
            parsed = yield (0, exports.TributeTezoTrooperz)(nft, account, whitelisted);
            break;
        default:
            parsed = yield (0, exports.Default)(nft, account, whitelisted);
            break;
    }
    return parsed;
});
exports.tezosParser = tezosParser;
const Default = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { collectionIdent, uri, native, native: { tokenId, chainId, contract, meta: { token: { metadata: { displayUri, image, animation_url, description, attributes, name, symbol, formats, }, }, }, }, } = nft;
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
            animation_url,
            animation_url_format: "mp4",
            attributes,
            symbol,
            description,
            name,
        },
    };
    return parsed;
});
exports.Default = Default;
// ! "KT18pPEPFqiP472bWxmxvN1NmMMFZVhojwEA"
const TributeTezoTrooperz = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { collectionIdent, uri, native, native: { tokenId, chainId, contract, meta: { token: { metadata: { description, attributes, formats, image, name, symbol, }, }, }, }, } = nft;
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
