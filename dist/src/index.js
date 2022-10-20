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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nftGeneralParser = exports.apenftSign = exports.apenftKey = exports.proxy = void 0;
const axios_1 = __importDefault(require("axios"));
const evm = __importStar(require("./factory"));
const algorand_1 = require("./factory/algorand");
const tezos = __importStar(require("./factory/tezos"));
const veChain = __importStar(require("./factory/veChain"));
const fantom = __importStar(require("./factory/fantom"));
const aurora = __importStar(require("./factory/auora"));
const secret = __importStar(require("./factory/secret"));
const elrond_1 = require("./factory/elrond");
const tron_1 = require("./factory/tron");
const evm_1 = __importDefault(require("../tools/evm"));
var isNode = false;
if (typeof process === "object") {
    if (typeof process.versions === "object") {
        if (typeof process.versions.node !== "undefined") {
            isNode = true;
        }
    }
}
exports.proxy = isNode
    ? ""
    : "https://sheltered-crag-76748.herokuapp.com/";
exports.apenftKey = "rV9UjZwMSK4zqkKEWOUnUXXY2zNgPJ8i";
exports.apenftSign = "7c9caa14981ff714f92fe16322bcf13803cd3c0d219ef008eb0e5ebf352814ca.7625.1663231473";
axios_1.default.defaults.timeout = isNode ? 3000 : axios_1.default.defaults.timeout;
axios_1.default.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    if (error.code === "ECONNABORTED") {
        return Promise.reject("parse timeout");
    }
    return Promise.reject(error);
});
const evmHelper = (0, evm_1.default)();
const nftGeneralParser = (nft, account, whitelisted, factory) => __awaiter(void 0, void 0, void 0, function* () {
    //proxy = mode === "proxy" ? proxy : "";
    const { native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    evmHelper.init(factory);
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
            parsed = yield fantom.fantomParser(collectionIdent, nft, account, whitelisted);
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
            parsed = yield aurora.auroraParser(collectionIdent, nft, account, whitelisted);
            break;
        case "23":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "5":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "25":
            parsed = yield veChain.veChainParser(collectionIdent, nft, account, whitelisted);
            break;
        case "2":
            parsed = yield (0, elrond_1.elrondParser)(collectionIdent, nft, account, whitelisted);
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
        case "24":
            parsed = yield secret.secretParser(collectionIdent, nft, account, whitelisted);
        case "30":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "32":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        case "33":
            parsed = yield evmParser(collectionIdent, nft, account, whitelisted);
            break;
        default:
            return yield evmParser(collectionIdent, nft, account, whitelisted);
    }
    return parsed;
});
exports.nftGeneralParser = nftGeneralParser;
__exportStar(require("../tools/helpers"), exports);
const evmParser = (collectionIdent, nft, account, whitelisted, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    if (!nft.uri) {
        nft = yield evmHelper.getUri(nft, collectionIdent);
    }
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
        case "0x36F8f51f65Fe200311F709b797baF4E193DD0b0D": {
            parsed = yield evm.TreatNFT(nft, account, whitelisted);
            break;
        }
        case "0x2C83EAf6E460C673d92477a7c49eb4ECd04e1216":
            parsed = yield evm.DirtyLife(nft, account, whitelisted);
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
        case "0x0c5AB026d74C451376A4798342a685a0e99a5bEe": {
            parsed = yield evm.MachineFi(nft, account, whitelisted);
            break;
        }
        case "0xc254a8d4ef5f825fd31561bdc69551ed2b8db134":
            parsed = yield evm.WrappedXPNET(nft, account, whitelisted);
            break;
        case "0xca4f6b3f9e45e2484913bcc46667f1bb6db72906":
            parsed = yield evm.TRSRNFT(nft, account, whitelisted);
            break;
        case "0xeA380Be04a398d93030E4Bff15cBC87f6B35b5ae":
            parsed = yield evm.WUBI(nft, account, whitelisted);
            break;
        case "0xeA380Be04a398d93030E4Bff15cBC87f6B35b5ae":
            parsed = yield evm.PACK(nft, account, whitelisted);
            break;
        case "0x32319834d90323127988E4e2DC7b2162d4262904": //fuze
            parsed = yield evm.COZYCOSM(nft, account, whitelisted);
            break;
        case "0xb73cc6d7a621e0e220b369c319dbfac258cef4d2": //veals OGPUNKS
            parsed = yield evm.VelasOgPunks(nft, account, whitelisted);
            break;
        case "0x868c047be897e30e8e5e7e2feeef4ae95cb28796": //veals OGPUNKS
            parsed = yield evm.Cities(nft, account, whitelisted);
            break;
        case "0xe38400150bde0f8efdda9f3a11f89c8a1660fa84": //veals OGPUNKS
            parsed = yield evm.Mountains(nft, account, whitelisted);
            break;
        case "0x387d38eeaaa7f1235c00ae6ee9b1462c026007f4": //veals OGPUNKS
            parsed = yield evm.ChainCaders(nft, account, whitelisted);
            break;
        case "0xf0F7C1159A523Ac3475Ef80F4a7292ce9b33A2b5":
            parsed = yield evm.Drifters(nft, account, whitelisted);
            break;
        //0x387d38eeaaa7f1235c00ae6ee9b1462c026007f4
        case "0x458d37551bd25C025648717E9Ee128b9DEd4dC59": {
            parsed = yield evm.Weed(nft, account, whitelisted);
            break;
        }
        case "0x09D9D1AFf7b40916236966cdE92023af770e78bB": {
            parsed = yield evm.CoolPig(nft, account, whitelisted);
            break;
        }
        case "0x34933A5958378e7141AA2305Cdb5cDf514896035":
            parsed = yield evm.abeyChainUserMinter(nft, account, whitelisted);
            break;
        //0x09D9D1AFf7b40916236966cdE92023af770e78bB
        case "0xc97e56Cd5777b46015F88BBB047f90cf556f520b":
            parsed = yield evm.RCM(nft, account, whitelisted);
            break;
        case "0x422d7d54A8608bF2b71cDd62FA943892E4A91Fcf":
            parsed = yield evm.AbeyDefault(nft, account, whitelisted);
            break;
        case "0x691A98fB3B5b9bdfc240ec3aada3D97eb867483c":
            parsed = yield evm.moonbeamDefault(nft, account, whitelisted);
            break;
        default:
            parsed = yield evm.Default(nft, account, whitelisted);
            break;
    }
    return parsed;
});
