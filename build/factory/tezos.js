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
exports.TributeTezoTrooperz = exports.tezosDefault = void 0;
const _1 = require(".");
const tezosDefault = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    debugger;
    const { collectionIdent, uri, native: { tokenId, chainId, contract, meta: { token: { metadata: { description, attributes, formats, image, name, symbol, }, }, }, }, } = nft;
    const mimeType = formats.length > 0 ? (_a = formats[0]) === null || _a === void 0 ? void 0 : _a.mimeType : undefined;
    const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
    const parsed = {
        chainId,
        tokenId,
        contract,
        uri,
        owner: account,
        collectionIdent,
        metadata: {
            image: (0, _1.setupURI)(image),
            imageFormat: format,
        },
        misc: {
            attributes,
            symbol,
            description,
            name,
        },
    };
    console.log("tezos: ", parsed);
    return parsed;
});
exports.tezosDefault = tezosDefault;
// ! "KT18pPEPFqiP472bWxmxvN1NmMMFZVhojwEA"
const TributeTezoTrooperz = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { collectionIdent, uri, native: { tokenId, chainId, contract, meta: { token: { metadata: { description, attributes, formats, image, name, symbol, }, }, }, }, } = nft;
    const mimeType = formats[0].mimeType;
    const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
    const parsed = {
        chainId,
        tokenId,
        contract,
        uri,
        owner: account,
        collectionIdent,
        metadata: {
            image: (0, _1.setupURI)(image),
            imageFormat: format,
        },
        misc: {
            attributes,
            symbol,
            description,
            name,
        },
    };
    console.log("tezos: ", parsed);
    return parsed;
});
exports.TributeTezoTrooperz = TributeTezoTrooperz;
