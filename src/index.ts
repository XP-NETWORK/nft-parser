import axios from "axios";
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
    CartelPunks,
    TreatNFT,
    IdoDirt,
    Awokensages,
    Technomaniacs,
    ArcadeEdition,
    Founders_Cabinet,
    TTAV,
    BoredGUtterCats,
    IDoDirtPolygon,
    ArsenalGame,
    Mate,
    ABCBears,
    TragicMonsters,
    SuperFatAcademy,
    ForgottenRunesComic,
} from "./factory";
import { tezosDefault, TributeTezoTrooperz } from "./factory/tezos";

interface ParsedNFT {
    chainId: string;
    tokenId: string;
    owner: string;
    uri: string;
    contract: string;
    collectionIdent: string;
    native: any;
    metaData: {
        image: string;
        imageFormat: string;
        animation_url?: string;
        animation_url_format?: string;
        name?: string;
        symbol?: string;
        attributes?: any;
        description?: string;
        contractType?: string;
    };
}

export const nftGeneralParser = async (
    nft: any,
    account: string
): Promise<ParsedNFT> => {
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
        // case "18":
        //     parsed = await tezosParser(nft, account);
        default:
            return nft;
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
        case "0x4c1900270dbf0c1e6a9c984aef9a18a7cb9ab1cc":
            parsed = await CartelPunks(nft, account);
            break;
        case "0x36f8f51f65fe200311f709b797baf4e193dd0b0d":
            parsed = await TreatNFT(nft, account);
            break;
        case "0x2c83eaf6e460c673d92477a7c49eb4ecd04e1216":
            parsed = await IdoDirt(nft, account);
            break;
        case "0x691bd0f2f5a145fcf297cf4be79095b66f002cbc":
            parsed = await Awokensages(nft, account);
            break;
        case "0x7f3495cf2d05db6e9e52cdf989bced71e786725c":
            parsed = await Technomaniacs(nft, account);
            break;
        case "0xe7f8ccda432239dcb418e94d625bc2fe6350f6bb":
            parsed = await ArcadeEdition(nft, account);
            break;
        case "0x56d93767467c54bd86578666904087c4f16cdb7f":
            parsed = await Founders_Cabinet(nft, account);
            break;
        case "0x2d317ed6c2e3eb5c54ca7518ef19deee96c15c85":
            parsed = await TTAV(nft, account);
            break;
        case "0x7a7ca3b27760b52428d7a9d0a9f369ff31a2de94":
            parsed = await BoredGUtterCats(nft, account);
            break;
        case "0x2feee2cc7fb32bd48ab22080e2c680f5390ef426":
            parsed = await IDoDirtPolygon(nft, account);
            break;
        case "0x2953399124f0cbb46d2cbacd8a89cf0599974963":
            parsed = await ArsenalGame(nft, account);
            break;
        case "0xc69ecd37122a9b5fd7e62bc229d478bb83063c9d":
            parsed = await Mate(nft, account);
            break;
        case "0x8eaeaa3a67abfc7c141775234fc30c707e26cf49":
            parsed = await ABCBears(nft, account);
            break;
        case "0x51ecb52ebb85384679b108a9e6a017ae17754eef":
            parsed = await TragicMonsters(nft, account);
            break;
        case "0xbede8ad4878e5ce441accce6a828ea7bc5be1ed0":
            parsed = await SuperFatAcademy(nft, account);
            break;
        case "0xb94c3fd0016888bab09dbc229f9397294e828a54":
            parsed = await ForgottenRunesComic(nft, account);
            break;
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
