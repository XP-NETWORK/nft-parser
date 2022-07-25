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
const xpnet_web3_contracts_1 = require("xpnet-web3-contracts");
class EvmContract {
    constructor() {
        this.providers = {};
    }
    getUri(nft, collectionIdent) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.chainPrams && ((_a = nft.native) === null || _a === void 0 ? void 0 : _a.chainId) && ((_b = nft.native) === null || _b === void 0 ? void 0 : _b.tokenId)) {
                try {
                    const provider = this.providers[nft.native.chainId]
                        ? this.providers[nft.native.chainId]
                        : yield (yield this.chainPrams.inner(+nft.native.chainId)).getProvider();
                    this.providers[nft.native.chainId] = provider;
                    const erc = xpnet_web3_contracts_1.UserNftMinter__factory.connect(collectionIdent, provider);
                    const uri = yield erc.tokenURI((_c = nft.native) === null || _c === void 0 ? void 0 : _c.tokenId).catch((e) => {
                        console.log(e);
                        return nft.uri;
                    });
                    return Object.assign(Object.assign({}, nft), { uri });
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }
    init(chainPrams) {
        if (!this.chainPrams && chainPrams)
            this.chainPrams = chainPrams;
    }
}
exports.default = () => new EvmContract();
