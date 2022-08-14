import { stringify } from "querystring";
import BigNumber from "bignumber.js";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import requestPool from "../../tools/requestPool";
import { NFT, setupURI } from ".";
import * as evm from "./index";
import { checkEmptyFromTezos } from "./tezos";

import { fromBuffer } from "file-type";

import { proxy } from "..";

const pool = requestPool(3000);
const cheerio = require("cherio");

export const veChainParser = async (
  collectionIdent: string,
  nft: any,
  account: string,
  whitelisted: boolean,
  chainId?: string
) => {
  let parsed;
  switch (true) {
    case /0x5E6265680087520DC022d75f4C45F9CCD712BA97/.test(collectionIdent):
      parsed = await WOVY(nft, account, whitelisted);
      break;

    case /0xf0E778BD5C4c2F219A2A5699e3AfD2D82D50E271/.test(collectionIdent):
      parsed = await WrappedXPNET(nft, account, whitelisted);
      break;

    case /0x2FD3d1E1a3F1E072c89d67301a86a5ba850Ccd4E/.test(collectionIdent):
      parsed = await Anon(nft, account, whitelisted);
      break;

    case /0x3473c5282057D7BeDA96C1ce0FE708e890764009/.test(collectionIdent):
      parsed = await Planet(nft, account, whitelisted);
      break;

    case /(0x38914ed8E9AB65554A23CcF285dfd212C13795cE|0x4E9eB6f6e04464eEe33Ae04Bf430E20529482e60|0x1d971Ac972F671c19D1bE00E4Fbf3118d3861851)/.test(
      collectionIdent
    ):
      parsed = await Forest(nft, account, whitelisted);
      break;

    default:
      parsed = await evm.Default(nft, account, whitelisted);
      break;
  }

  return parsed;
};

const Planet = async (nft: any, account: string, whitelisted: boolean) => {
  const {
    native,
    native: { contract, tokenId, chainId },
    collectionIdent,
    uri,
  } = nft;

  try {
    const response = await axios(`${proxy}${setupURI(uri)}`).catch((e) => {
      return {
        data: null,
      };
    });

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
      //wrapped: data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(
          data?.Image ||
            `https://ipfs.io/ipfs/QmUPcqQoBZufMTeC9tY434o3Roa4b8ZKiTpUjk2rerd7UX/${tokenId}.jpg`
        ),
        imageFormat: data?.Image?.match(/\.([^.]*)$/)?.at(1) || "jpg",
        description: data?.Description,
        name: data?.Name,
        attributes: data?.attributes,
        collectionName: "Exoworlds New",
      },
    };
    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
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

    const src = setupURI(metadata.fileUrl);

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: metadata.wrapped,
      metaData: {
        whitelisted,
        image: src,
        imageFormat: "",
        description: metadata.description,
        animation_url: src,
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

const Anon = async (nft: any, account: string, whitelisted: boolean) => {
  const {
    native,
    native: { contract, tokenId, chainId },
    collectionIdent,
    uri,
  } = nft;

  try {
    const response = await axios(
      `${proxy}${`https://blackv2.mypinata.cloud/ipfs/QmNrySrtR9E9VfnNGoJqohTvZh4K6Bo79L3eonRVk3xwUs/${tokenId}.json`}`
    ).catch(() => ({
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
      wrapped: data.wrapped,
      metaData: {
        whitelisted,
        image: `https://blackv2.mypinata.cloud/ipfs/QmNrySrtR9E9VfnNGoJqohTvZh4K6Bo79L3eonRVk3xwUs/${tokenId}.png`,
        imageFormat: "png",
        description: data?.description,
        name: "Venonymous " + data?.name,
        symbol: "VENONYMOUS",
        collectionName: "Venonymous",
        attributes: data?.attributes,
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
      wrapped: data.wrapped,
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

const Forest = async (nft: any, account: string, whitelisted: boolean) => {
  const {
    native,
    native: { contract, tokenId, chainId },
    collectionIdent,
    uri,
  } = nft;

  try {
    const response = proxy
      ? ((await pool.addRequest(`${proxy}${setupURI(uri)}`)) as AxiosResponse<
          any,
          any
        >)
      : await axios(`${proxy}${setupURI(uri)}`);

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
      wrapped: data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: data.image?.match(/\.([^.]*)$/)?.at(1),
        description: data.description,
        name: data?.name,
        symbol: data.symbol,
        attributes: data.attributes,
        contractType: data.type,
        collectionName: data?.compiler,
      },
    };
    return nft;
  } catch (error: any) {
    console.log(error.message || "parse timeout forest");
    return nft;
  }
};
