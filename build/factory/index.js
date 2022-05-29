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
const xp_network_1 = require("xp.network");
const getTestNetConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield xp_network_1.ChainFactoryConfigs.TestNet();
});
const getMainNetConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield xp_network_1.ChainFactoryConfigs.MainNet();
});
const getFactory = (mainNet) => {
    return mainNet ? xp_network_1.AppConfigs.MainNet() : xp_network_1.AppConfigs.TestNet();
};
// chainId: 1666600000,
// tnChainId: 1666700000,
const getChainProvider = (chainId) => __awaiter(void 0, void 0, void 0, function* () {
    const mainNetConfig = yield getMainNetConfig();
    const testNetConfig = yield getTestNetConfig();
    let provider;
    switch (chainId) {
        case "56":
            provider = mainNetConfig.bscParams.provider; // bscParams MainNet Provider
            break;
        case "97":
            provider = testNetConfig.bscParams.provider; // bscParams TestNet Provider
            break;
        case "43114":
            provider = mainNetConfig.avalancheParams.provider; // avalancheParams MainNet Provider
            break;
        case "43113":
            provider = testNetConfig.avalancheParams.provider; // avalancheParams TestNet Provider
            break;
        case "137":
            provider = mainNetConfig.polygonParams.provider; // polygonParams MainNet Provider
            break;
        case "80001":
            provider = testNetConfig.polygonParams.provider; // polygonParams TestNet Provider
            break;
        case "250":
            provider = mainNetConfig.fantomParams.provider; // fantomParams MainNet Provider
            break;
        case "4002":
            provider = testNetConfig.fantomParams.provider; // fantomParams TestNet Provider
            break;
        case "1666600000":
            provider = mainNetConfig.harmonyParams.provider; // harmonyParams MainNet Provider
            break;
        case "1666700000":
            provider = testNetConfig.harmonyParams.provider; // harmonyParams TestNet Provider
            break;
        case "100":
            provider = mainNetConfig.xDaiParams.provider; // xDaiParams MainNet Provider
            break;
        case "122":
            provider = mainNetConfig.fuseParams.provider; // fuseParams mainNet Provider
            break;
        case "123":
            provider = testNetConfig.fuseParams.provider; // fuseParams testNet Provider
            break;
        case "106":
            provider = mainNetConfig.velasParams.provider; // velasParams mainnet Provider
            break;
        case "4689":
            provider = mainNetConfig.iotexParams.provider; // iotexParams mainNet Provider
            break;
        case "4690":
            provider = testNetConfig.iotexParams.provider; // iotexParams testNet Provider
            break;
        case "1313161554":
            provider = mainNetConfig.auroraParams.provider; // auroraParams mainnet Provider
            break;
        case "1313161555":
            provider = testNetConfig.auroraParams.provider; // auroraParams testnet Provider
            break;
        case "86":
            provider = mainNetConfig.gateChainParams.provider; // gateChainParams mainnet Provider
            break;
        case "85":
            provider = testNetConfig.gateChainParams.provider; // gateChainParams testnet Provider
            break;
        case "1":
            provider = mainNetConfig.ropstenParams.provider; // ropstenParams mainnet Provider
            break;
        case "3":
            provider = testNetConfig.ropstenParams.provider; // ropstenParams testnet Provider
            break;
        case "74":
            provider = mainNetConfig.vechainParams.provider; // vechainParams mainnet Provider
            break;
        case "39":
            provider = testNetConfig.vechainParams.provider; // vechainParams testnet Provider
            break;
        default:
            break;
    }
});
// const Contract = require("web3-eth-contract");
