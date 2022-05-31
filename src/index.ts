import {
    getNFTUri,
    ART_NFT_MATIC,
    EtherHead,
    AngelOfAether,
    Default,
    Legend,
    AlphaBettyDoodle,
} from "./factory";

type NFT = {
    contract: string;
    tokenId: string;
    chainId: string;
};

// TODO Function that parse metadata
// TODO Function Post metadata object if nft first time parsed
// TODO Function Get metadata object if nft is on database

export const nftparse = async (nft: any, account: string) => {
    const {
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;
    let parsed;
    // const uri = await getNFTUri(chainId, contract, tokenId);
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
        default:
            parsed = await Default(nft, account);
            break;
    }
    return parsed;
};
