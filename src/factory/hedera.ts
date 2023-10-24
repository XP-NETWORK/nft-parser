import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { NFT, setupURI } from ".";

import { proxy } from "..";

import { Default } from "./index";
import { extractType } from "..";

const cheerio = require("cherio");

export const hederaParser = async (
    collectionIdent: string,
    nft: any,
    account: string,
    whitelisted: boolean,
    chainId?: string
) => {
    let parsed;
    switch (true) {
        case /(0x000000000000000000000000000000000008f387)/.test(
            collectionIdent
        ):
            parsed = await BRONZE(nft, account, whitelisted);
            break;

        default:
            parsed = await Default(nft, account, whitelisted);
            break;
    }

    return parsed;
};

const BRONZE = async (nft: any, account: string, whitelisted: boolean) => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;

    try {
        const response = (await axios(`${proxy}${setupURI(uri)}`))?.data;

        if (!response) throw new Error("Could not fetch hedera nft::BRONZE");

        let img = response.image?.description
            ? (await axios(`${proxy}${setupURI(response.image.description)}`))
                  ?.data
            : "";

        if (img) {
            const $ = cheerio.load(img);
            const link = $(
                "#content  table  tbody  tr:first-child td:nth-child(2) > a"
            ).attr("href");
            img = "https://cloudflare-ipfs.com" + link;
        }

        const nft: NFT = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                name: response.name,
                description: response.description?.description,
                image: img,
                imageFormat: extractType(img),
                whitelisted: true,
            },
        };

        return nft;
    } catch (error) {
        console.error(error);

        return nft;
    }
};
