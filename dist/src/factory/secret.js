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
exports.secretParser = void 0;
const secretParser = (collectionIdent, nft, account, whitelisted, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    let parsed;
    switch (collectionIdent) {
        default: {
            parsed = Object.assign(Object.assign({}, nft), { metaData: ((_a = Object.keys(nft === null || nft === void 0 ? void 0 : nft.metaData)) === null || _a === void 0 ? void 0 : _a.length) === 0
                    ? Object.assign(Object.assign({}, (_b = nft.native) === null || _b === void 0 ? void 0 : _b.metadata), { image: (_f = (_e = (_d = (_c = nft.native) === null || _c === void 0 ? void 0 : _c.metadata) === null || _d === void 0 ? void 0 : _d.media) === null || _e === void 0 ? void 0 : _e.at(0)) === null || _f === void 0 ? void 0 : _f.url }) : nft.metaData });
            break;
        }
    }
    return parsed;
});
exports.secretParser = secretParser;
