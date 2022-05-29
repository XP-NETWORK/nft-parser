import { Provider } from "@ethersproject/abstract-provider";
import { stringify } from "querystring";
import {
    ChainFactoryConfigs,
    ChainFactory,
    Chain,
    AppConfigs,
    ChainParams,
} from "xp.network";

const Contract = require("web3-eth-contract");

const getTestNetConfig: any = async () => {
    return await ChainFactoryConfigs.TestNet();
};

const getMainNetConfig: any = async () => {
    return await ChainFactoryConfigs.MainNet();
};

const getFactory: any = (mainNet: boolean) => {
    return mainNet ? AppConfigs.MainNet() : AppConfigs.TestNet();
};

const getChainProvider = async (chainId: string) => {
    const mainNetConfig = await getMainNetConfig();
    const testNetConfig = await getTestNetConfig();
    let provider: any;
    switch (chainId) {
        case "56":
            provider = mainNetConfig.bscParams.provider; // bscParams MainNet Provider
            return provider;
        case "97":
            provider = testNetConfig.bscParams.provider; // bscParams TestNet Provider
            return provider;
        case "43114":
            provider = mainNetConfig.avalancheParams.provider; // avalancheParams MainNet Provider
            return provider;
        case "43113":
            provider = testNetConfig.avalancheParams.provider; // avalancheParams TestNet Provider
            return provider;
        case "137":
            provider = mainNetConfig.polygonParams.provider; // polygonParams MainNet Provider
            return provider;
        case "80001":
            provider = testNetConfig.polygonParams.provider; // polygonParams TestNet Provider
            return provider;
        case "250":
            provider = mainNetConfig.fantomParams.provider; // fantomParams MainNet Provider
            return provider;
        case "4002":
            provider = testNetConfig.fantomParams.provider; // fantomParams TestNet Provider
            return provider;
        case "1666600000":
            provider = mainNetConfig.harmonyParams.provider; // harmonyParams MainNet Provider
            return provider;
        case "1666700000":
            provider = testNetConfig.harmonyParams.provider; // harmonyParams TestNet Provider
            return provider;
        case "100":
            provider = mainNetConfig.xDaiParams.provider; // xDaiParams MainNet Provider
            return provider;
        case "122":
            provider = mainNetConfig.fuseParams.provider; // fuseParams mainNet Provider
            return provider;
        case "123":
            provider = testNetConfig.fuseParams.provider; // fuseParams testNet Provider
            return provider;
        case "106":
            provider = mainNetConfig.velasParams.provider; // velasParams mainnet Provider
            return provider;
        case "4689":
            provider = mainNetConfig.iotexParams.provider; // iotexParams mainNet Provider
            return provider;
        case "4690":
            provider = testNetConfig.iotexParams.provider; // iotexParams testNet Provider
            return provider;
        case "1313161554":
            provider = mainNetConfig.auroraParams.provider; // auroraParams mainnet Provider
            return provider;
        case "1313161555":
            provider = testNetConfig.auroraParams.provider; // auroraParams testnet Provider
            return provider;
        case "86":
            provider = mainNetConfig.gateChainParams.provider; // gateChainParams mainnet Provider
            return provider;
        case "85":
            provider = testNetConfig.gateChainParams.provider; // gateChainParams testnet Provider
            return provider;
        case "1":
            provider = mainNetConfig.ropstenParams.provider; // ropstenParams mainnet Provider
            return provider;
        case "3":
            provider = testNetConfig.ropstenParams.provider; // ropstenParams testnet Provider
            return provider;
        case "74":
            provider = mainNetConfig.vechainParams.provider; // vechainParams mainnet Provider
            return provider;
        case "39":
            provider = testNetConfig.vechainParams.provider; // vechainParams testnet Provider
            return provider;
        default:
            break;
    }
};

export const getSmartContract: any = async (
    chainId: string,
    contractAddress: string
) => {
    const provider = await getChainProvider(chainId);
    Contract.provider(provider);
    return Contract;
};

// const Contract = require("web3-eth-contract");
