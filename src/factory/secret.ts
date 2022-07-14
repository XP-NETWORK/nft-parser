import axios from "axios";
import { nftGeneralParser } from "..";
import { proxy, NFT, setupURI } from ".";
import * as evm from ".";

export const secretParser = async (
    collectionIdent: string,
    nft: any,
    account: string,
    whitelisted: boolean,
    chainId?: string
) => {
    let parsed;
    switch (collectionIdent) {
        default:
            parsed = await evm.Default(nft, account, whitelisted);
            break;
    }

    return parsed;
};
