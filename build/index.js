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
        // case "18":
        //     parsed = await tezosParser(nft, account);
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
        case "0x4c1900270dbf0c1e6a9c984aef9a18a7cb9ab1cc":
            parsed = yield (0, factory_1.CartelPunks)(nft, account);
            break;
        case "0x36f8f51f65fe200311f709b797baf4e193dd0b0d":
            parsed = yield (0, factory_1.TreatNFT)(nft, account);
            break;
        case "0x2c83eaf6e460c673d92477a7c49eb4ecd04e1216":
            parsed = yield (0, factory_1.IdoDirt)(nft, account);
            break;
        case "0x691bd0f2f5a145fcf297cf4be79095b66f002cbc":
            parsed = yield (0, factory_1.Awokensages)(nft, account);
            break;
        case "0x7f3495cf2d05db6e9e52cdf989bced71e786725c":
            parsed = yield (0, factory_1.Technomaniacs)(nft, account);
            break;
        case "0xe7f8ccda432239dcb418e94d625bc2fe6350f6bb":
            parsed = yield (0, factory_1.ArcadeEdition)(nft, account);
            break;
        case "0x56d93767467c54bd86578666904087c4f16cdb7f":
            parsed = yield (0, factory_1.Founders_Cabinet)(nft, account);
            break;
        case "0x2d317ed6c2e3eb5c54ca7518ef19deee96c15c85":
            parsed = yield (0, factory_1.TTAV)(nft, account);
            break;
        case "0x7a7ca3b27760b52428d7a9d0a9f369ff31a2de94":
            parsed = yield (0, factory_1.BoredGUtterCats)(nft, account);
            break;
        case "0x2feee2cc7fb32bd48ab22080e2c680f5390ef426":
            parsed = yield (0, factory_1.IDoDirtPolygon)(nft, account);
            break;
        case "0x2953399124f0cbb46d2cbacd8a89cf0599974963":
            parsed = yield (0, factory_1.ArsenalGame)(nft, account);
            break;
        case "0xc69ecd37122a9b5fd7e62bc229d478bb83063c9d":
            parsed = yield (0, factory_1.Mate)(nft, account);
            break;
        case "0x8eaeaa3a67abfc7c141775234fc30c707e26cf49":
            parsed = yield (0, factory_1.ABCBears)(nft, account);
            break;
        case "0x51ecb52ebb85384679b108a9e6a017ae17754eef":
            parsed = yield (0, factory_1.TragicMonsters)(nft, account);
            break;
        case "0xbede8ad4878e5ce441accce6a828ea7bc5be1ed0":
            parsed = yield (0, factory_1.SuperFatAcademy)(nft, account);
            break;
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
