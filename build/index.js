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
exports.nftparse = void 0;
const factory_1 = require("./factory");
// TODO Function that parse metadata
// TODO Function Post metadata object if nft first time parsed
// TODO Function Get metadata object if nft is on database
const nftparse = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    let parsed;
    // const uri = await getNFTUri(chainId, contract, tokenId);
    switch (collectionIdent) {
        case "0x0271c6853d4b2bdccd53aaf9edb66993e14d4cba":
            parsed = yield (0, factory_1.ART_NFT_MATIC)(nft, account);
            break;
        case "0x4508af04de4073b10a53ac416eb311f4a2ab9569":
            parsed = yield (0, factory_1.ART_NFT_MATIC)(nft, account);
            break;
        case "0xa8a079ea48dc846899bdb542f3728dbc6758fdfa":
            parsed = yield (0, factory_1.EtherHead)(nft, account);
            break;
        case "0x6e1ecc59f4005d0f2707ab7a0a8cecbaba41c11e":
            parsed = yield (0, factory_1.AngelOfAether)(nft, account);
            break;
        case "0xe5b3903ffb3a00e91c75e25a4bd6616d3171e45e":
            parsed = yield (0, factory_1.Legend)(nft, account);
            break;
        case "0xee6d7e31ea2095df9b2f89ec15111d3de5cd39af":
            parsed = yield (0, factory_1.AlphaBettyDoodle)(nft, account);
            break;
        default:
            parsed = yield (0, factory_1.Default)(nft, account);
            break;
    }
    return parsed;
});
exports.nftparse = nftparse;
