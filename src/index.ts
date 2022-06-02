import {
    getNFTUri,
    ART_NFT_MATIC,
    EtherHead,
    AngelOfAether,
    Default,
    Legend,
    AlphaBettyDoodle,
    Mabstronauts,
    RocketMonsters,
    TheBlackMagic,
    BlackCat,
} from "./factory";
import { tezosDefault, TributeTezoTrooperz } from "./factory/tezos";

type NFT = {
    contract: string;
    tokenId: string;
    chainId: string;
};

export const nftGeneralParser = async (nft: any, account: string) => {
    const {
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    let parsed;
    switch (chainId) {
        case "4":
            parsed = await evmParser(collectionIdent, nft, account);
            break;
        case "6":
            parsed = await evmParser(collectionIdent, nft, account);
            break;
        case "7":
            parsed = await evmParser(collectionIdent, nft, account);
            break;
        case "8":
            parsed = await evmParser(collectionIdent, nft, account);
            break;
        case "12":
            parsed = await evmParser(collectionIdent, nft, account);
            break;
        case "14":
            parsed = await evmParser(collectionIdent, nft, account);
            break;
        case "16":
            parsed = await evmParser(collectionIdent, nft, account);
            break;
        case "19":
            parsed = await evmParser(collectionIdent, nft, account);
            break;
        case "20":
            parsed = await evmParser(collectionIdent, nft, account);
            break;
        case "21":
            parsed = await evmParser(collectionIdent, nft, account);
            break;
        case "23":
            parsed = await evmParser(collectionIdent, nft, account);
            break;
        case "5":
            parsed = await evmParser(collectionIdent, nft, account);
            break;
        case "25":
            parsed = await evmParser(collectionIdent, nft, account);
            break;
        case "18":
            parsed = await tezosParser(nft, account);
    }
    return parsed;
};

const evmParser = async (
    collectionIdent: string,
    nft: any,
    account: string
) => {
    let parsed;
    switch (collectionIdent) {
        case "0x0271c6853d4b2bdccd53aaf9edb66993e14d4cba":
            parsed = await ART_NFT_MATIC(nft, account);
            break;
        case "0x4508af04de4073b10a53ac416eb311f4a2ab9569":
            parsed = await ART_NFT_MATIC(nft, account);
            break;
        case "0xa8a079ea48dc846899bdb542f3728dbc6758fdfa":
            parsed = await EtherHead(nft, account);
            break;
        case "0x6e1ecc59f4005d0f2707ab7a0a8cecbaba41c11e":
            parsed = await AngelOfAether(nft, account);
            break;
        case "0xe5b3903ffb3a00e91c75e25a4bd6616d3171e45e":
            parsed = await Legend(nft, account);
            break;
        case "0xee6d7e31ea2095df9b2f89ec15111d3de5cd39af":
            parsed = await AlphaBettyDoodle(nft, account);
            break;
        case "0x65f1A1D6E65fb43672BD936858D69b88C0D2059e":
            parsed = await Mabstronauts(nft, account);
            break;
        case "0x0D41c70E20587c2ec1cea9c4A3d394eC63C4bfbe":
            parsed = await RocketMonsters(nft, account);
            break;
        case "0xDcAA2b071c1851D8Da43f85a34a5A57d4Fa93A1A":
            parsed = await TheBlackMagic(nft, account);
            break;
        // case "0xDcAA2b071c1851D8Da43f85a34a5A57d4Fa93A1A":
        //     parsed = await BlackCat(nft, account);
        //     break;
        default:
            parsed = await Default(nft, account);
            break;
    }
    return parsed;
};

const tezosParser = async (nft: any, account: string) => {
    const {
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    let parsed;
    switch (collectionIdent) {
        case "KT18pPEPFqiP472bWxmxvN1NmMMFZVhojwEA":
            parsed = await TributeTezoTrooperz(nft, account);
            break;
        default:
            // parsed = await tezosDefault(nft, account);
            break;
    }
    return parsed;
};
