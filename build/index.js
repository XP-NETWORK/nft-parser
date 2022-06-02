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
exports.nftGeneralParser = void 0;
const factory_1 = require("./factory");
const tezos_1 = require("./factory/tezos");
const nftGeneralParser = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    let parsed;
    switch (chainId) {
        case "4":
            parsed = yield evmParser(collectionIdent, nft, account);
            break;
        case "6":
            parsed = yield evmParser(collectionIdent, nft, account);
            break;
        case "7":
            parsed = yield evmParser(collectionIdent, nft, account);
            break;
        case "8":
            parsed = yield evmParser(collectionIdent, nft, account);
            break;
        case "12":
            parsed = yield evmParser(collectionIdent, nft, account);
            break;
        case "14":
            parsed = yield evmParser(collectionIdent, nft, account);
            break;
        case "16":
            parsed = yield evmParser(collectionIdent, nft, account);
            break;
        case "19":
            parsed = yield evmParser(collectionIdent, nft, account);
            break;
        case "20":
            parsed = yield evmParser(collectionIdent, nft, account);
            break;
        case "21":
            parsed = yield evmParser(collectionIdent, nft, account);
            break;
        case "23":
            parsed = yield evmParser(collectionIdent, nft, account);
            break;
        case "5":
            parsed = yield evmParser(collectionIdent, nft, account);
            break;
        case "25":
            parsed = yield evmParser(collectionIdent, nft, account);
            break;
        case "18":
            parsed = yield tezosParser(nft, account);
    }
    return parsed;
});
exports.nftGeneralParser = nftGeneralParser;
const evmParser = (collectionIdent, nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
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
        case "0x65f1A1D6E65fb43672BD936858D69b88C0D2059e":
            parsed = yield (0, factory_1.Mabstronauts)(nft, account);
            break;
        case "0x0D41c70E20587c2ec1cea9c4A3d394eC63C4bfbe":
            parsed = yield (0, factory_1.RocketMonsters)(nft, account);
            break;
        case "0xDcAA2b071c1851D8Da43f85a34a5A57d4Fa93A1A":
            parsed = yield (0, factory_1.TheBlackMagic)(nft, account);
            break;
        // case "0xDcAA2b071c1851D8Da43f85a34a5A57d4Fa93A1A":
        //     parsed = await BlackCat(nft, account);
        //     break;
        default:
            parsed = yield (0, factory_1.Default)(nft, account);
            break;
    }
    return parsed;
});
const tezosParser = (nft, account) => __awaiter(void 0, void 0, void 0, function* () {
    const { native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    let parsed;
    switch (collectionIdent) {
        case "KT18pPEPFqiP472bWxmxvN1NmMMFZVhojwEA":
            parsed = yield (0, tezos_1.TributeTezoTrooperz)(nft, account);
            break;
        default:
            // parsed = await tezosDefault(nft, account);
            break;
    }
    return parsed;
});
