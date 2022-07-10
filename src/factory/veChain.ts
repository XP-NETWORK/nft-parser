import { stringify } from "querystring";
import BigNumber from "bignumber.js";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import requestPool from "../../tools/requestPool";
import { proxy, NFT, setupURI } from ".";
import * as evm from "./index";
import { checkEmptyFromTezos } from "./tezos";
const cheerio = require("cherio");

export const veChainParser = async (
    collectionIdent: string,
    nft: any,
    account: string,
    whitelisted: boolean,
    chainId?: string
) => {
    let parsed;
    switch (collectionIdent) {
        case "0x5E6265680087520DC022d75f4C45F9CCD712BA97":
            parsed = await WOVY(nft, account, whitelisted);
            break;

        case "0xf0E778BD5C4c2F219A2A5699e3AfD2D82D50E271":
            parsed = await WrappedXPNET(nft, account, whitelisted);
            break;

        default:
            parsed = await WrappedXPNET(nft, account, whitelisted);
            break;
    }

    return parsed;
};

const WOVY = async (nft: any, account: string, whitelisted: boolean) => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;

    try {
        const response = await axios(`${proxy}${uri}`).catch(() => ({
            data: null,
        }));

        const $ = cheerio.load(response.data);

        const script = $("#__NEXT_DATA__");

        const json = JSON.parse(script.get()[0].children[0].data);

        const metadata = json?.props?.pageProps?.token?.token;

        const nft: NFT = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                whitelisted,
                image: "",
                imageFormat: "",
                description: metadata.description,
                animation_url: setupURI(metadata.fileUrl),
                animation_url_format: "mp4",
                name: metadata.name,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);

        return nft;
    }
};

const WrappedXPNET = async (
    nft: any,
    account: string,
    whitelisted: boolean
) => {
    const {
        native,
        native: { contract, tokenId, chainId },
        collectionIdent,
        uri,
    } = nft;

    try {
        const response = await axios(`${proxy}${setupURI(uri)}`).catch(() => ({
            data: null,
        }));

        let { data } = response;

        data = await checkEmptyFromTezos(data);

        const nft: NFT = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: data.image?.match(/\.([^.]*)$/)?.at(1),
                description: data.description,
                name: data.name,
                symbol: data.symbol,
                attributes: data.attributes,
                contractType: data.type,
            },
        };
        return nft;
    } catch (error) {
        console.error(error);

        return nft;
    }
};
