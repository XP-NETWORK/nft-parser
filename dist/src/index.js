"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const evm = __importStar(require("./factory"));
const algorand_1 = require("./factory/algorand");
const elrd = __importStar(require("./factory/elrond"));
const tezos = __importStar(require("./factory/tezos"));
const tron_1 = require("./factory/tron");
const nftGeneralParser = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    let parsed;
    switch (chainId) {
        case "4":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "6":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "7":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted, chainId);
            break;
        case "8":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "12":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "14":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "16":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "19":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "20":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "21":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "23":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "5":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "25":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "2":
            parsed = yield elrondParser(collectionIdent, nft, account, whitelisted);
            break;
        case "15":
            parsed = yield (0, algorand_1.algorandParser)(collectionIdent, nft, account, whitelisted);
            break;
        case "9":
            parsed = yield (0, tron_1.tronParser)(collectionIdent, nft, account, whitelisted);
            break;
        case "18":
            parsed = yield tezos.tezosParser(collectionIdent, nft, account, whitelisted);
            break;
        default:
            return nft;
    }
    return parsed;
});
exports.nftGeneralParser = nftGeneralParser;
const evmParser = (collectionIdent, nft, account, whitelisted, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    switch (collectionIdent) {
        case "0x0271c6853d4b2bdccd53aaf9edb66993e14d4cba":
            parsed = yield evm.ART_NFT_MATIC(nft, account, whitelisted);
            break;
        case "0x4508af04de4073b10a53ac416eb311f4a2ab9569":
            parsed = yield evm.ART_NFT_MATIC(nft, account, whitelisted);
            break;
        case "0xa8a079ea48dc846899bdb542f3728dbc6758fdfa":
            parsed = yield evm.EtherHead(nft, account, whitelisted);
            break;
        case "0x6e1ecc59f4005d0f2707ab7a0a8cecbaba41c11e":
            parsed = yield evm.AngelOfAether(nft, account, whitelisted);
            break;
        case "0xe5b3903ffb3a00e91c75e25a4bd6616d3171e45e":
            parsed = yield evm.Legend(nft, account, whitelisted);
            break;
        case "0xee6d7e31ea2095df9b2f89ec15111d3de5cd39af":
            parsed = yield evm.AlphaBettyDoodle(nft, account, whitelisted);
            break;
        case "0x65f1A1D6E65fb43672BD936858D69b88C0D2059e":
            parsed = yield evm.Mabstronauts(nft, account, whitelisted);
            break;
        case "0x0D41c70E20587c2ec1cea9c4A3d394eC63C4bfbe":
            parsed = yield evm.RocketMonsters(nft, account, whitelisted);
            break;
        case "0xDcAA2b071c1851D8Da43f85a34a5A57d4Fa93A1A":
            parsed = yield evm.TheBlackMagic(nft, account, whitelisted);
            break;
        case "0x4c1900270dbf0c1e6a9c984aef9a18a7cb9ab1cc":
            parsed = yield evm.CartelPunks(nft, account, whitelisted);
            break;
        case "0x36f8f51f65fe200311f709b797baf4e193dd0b0d":
            parsed = yield evm.TreatNFT(nft, account, whitelisted);
            break;
        case "0x2c83eaf6e460c673d92477a7c49eb4ecd04e1216":
            parsed = yield evm.IdoDirt(nft, account, whitelisted);
            break;
        case "0x691bd0f2f5a145fcf297cf4be79095b66f002cbc":
            parsed = yield evm.Awokensages(nft, account, whitelisted);
            break;
        case "0x7f3495cf2d05db6e9e52cdf989bced71e786725c":
            parsed = yield evm.Technomaniacs(nft, account, whitelisted);
            break;
        case "0xe7f8ccda432239dcb418e94d625bc2fe6350f6bb":
            parsed = yield evm.ArcadeEdition(nft, account, whitelisted);
            break;
        case "0x56d93767467c54bd86578666904087c4f16cdb7f":
            parsed = yield evm.Founders_Cabinet(nft, account, whitelisted);
            break;
        case "0x2d317ed6c2e3eb5c54ca7518ef19deee96c15c85":
            parsed = yield evm.TTAV(nft, account, whitelisted);
            break;
        case "0x7a7ca3b27760b52428d7a9d0a9f369ff31a2de94":
            parsed = yield evm.BoredGUtterCats(nft, account, whitelisted);
            break;
        case "0x2feee2cc7fb32bd48ab22080e2c680f5390ef426":
            parsed = yield evm.IDoDirtPolygon(nft, account, whitelisted);
            break;
        case "0x2953399124f0cbb46d2cbacd8a89cf0599974963":
            parsed = chainId
                ? yield evm.OPENSTORE(nft, account, whitelisted)
                : yield evm.ArsenalGame(nft, account, whitelisted);
            break;
        case "0xc69ecd37122a9b5fd7e62bc229d478bb83063c9d":
            parsed = yield evm.Mate(nft, account, whitelisted);
            break;
        case "0x8eaeaa3a67abfc7c141775234fc30c707e26cf49":
            parsed = yield evm.ABCBears(nft, account, whitelisted);
            break;
        case "0x51ecb52ebb85384679b108a9e6a017ae17754eef":
            parsed = yield evm.TragicMonsters(nft, account, whitelisted);
            break;
        case "0xbede8ad4878e5ce441accce6a828ea7bc5be1ed0":
            parsed = yield evm.SuperFatAcademy(nft, account, whitelisted);
            break;
        case "0xb94c3fd0016888bab09dbc229f9397294e828a54":
            parsed = yield evm.ForgottenRunesComic(nft, account, whitelisted);
            break;
        case "0xd4c77e46b0266a7aca11083bcc86342f47bbdd04":
            parsed = yield evm.LilDickie(nft, account, whitelisted);
            break;
        case "0x9304f22a5ab577119210d730e41755a6732e19f7":
            parsed = yield evm.TheCheeks(nft, account, whitelisted);
            break;
        case "0x817c63be246dcfb5f218091baa581949b6796bdb":
            parsed = yield evm.Nagato(nft, account, whitelisted);
            break;
        case "0x495f947276749ce646f68ac8c248420045cb7b5e":
            parsed = yield evm.OpenSEA(nft, account, whitelisted);
            break;
        case "0x0c5ab026d74c451376a4798342a685a0e99a5bee":
            parsed = yield evm.MachineFi(nft, account, whitelisted);
            break;
        case "0xc254a8d4ef5f825fd31561bdc69551ed2b8db134":
            parsed = yield evm.WrappedXPNET(nft, account, whitelisted);
            break;
        case "0xca4f6b3f9e45e2484913bcc46667f1bb6db72906":
            parsed = yield evm.TRSRNFT(nft, account, whitelisted);
            break;
        case "0xeA380Be04a398d93030E4Bff15cBC87f6B35b5ae":
            parsed = yield evm.WUBI(nft, account, whitelisted);
            break;
        default:
            parsed = yield evm.Default(nft, account, whitelisted);
            break;
    }
    return parsed;
});
const elrondParser = (collectionIdent, nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    switch (collectionIdent) {
        case "AERMES-ac9886": {
            parsed = yield elrd.AERMES(nft, account, whitelisted);
            break;
        }
        case "DRIFTERS-efd96c": {
            parsed = yield elrd.DRIFTERS(nft, account, whitelisted);
            break;
        }
        case "NIFTYREX-d8c812": {
            parsed = yield elrd.DRIFTERS(nft, account, whitelisted);
            break;
        }
        case "INNOVATOR-fca3a7": {
            parsed = yield elrd.INNOVATOR(nft, account, whitelisted);
            break;
        }
        case "CGPASS-73ac68": {
            parsed = yield elrd.MEDUSA(nft, account, whitelisted);
            break;
        }
        case "ORC-ef544d": {
            parsed = yield elrd.ORC(nft, account, whitelisted);
            break;
        }
        case "STRAYCATS-b079a7": {
            parsed = yield elrd.WrappedXPNET(nft, account, whitelisted);
            break;
        }
        case "TAKANNE-3db244": {
            parsed = yield elrd.APOPHIS(nft, account, whitelisted);
            break;
        }
        default:
            parsed = yield elrd.DEFAULT(nft, account, whitelisted);
            break;
    }
    return parsed;
});
