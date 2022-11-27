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
exports.abeyParser = void 0;
const _1 = require(".");
const abeyParser = (collectionIdent, nft, account, whitelisted, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    if (/^0x/.test(nft.uri)) {
        nft = Object.assign(Object.assign({}, nft), { uri: `https://metadata.fantase.io/${nft.uri}` });
    }
    console.log(nft, "nft");
    switch (true) {
        default:
            parsed = (0, _1.Default)(nft, account, whitelisted);
    }
    return parsed;
});
exports.abeyParser = abeyParser;
