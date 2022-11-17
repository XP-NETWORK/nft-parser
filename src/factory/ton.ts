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

export const tonParser = async (
  collectionIdent: string,
  nft: any,
  account: string,
  whitelisted: boolean,
  chainId?: string
) => {
  let parsed;
  switch (true) {
    default:
      parsed = await Default(nft, account, whitelisted);
      break;
  }

  return parsed;
};

const Default = async (nft: any, account: string, whitelisted: boolean) => {
  const {
    native,
    native: { contract, tokenId, chainId, address },
    collectionIdent,
    uri,
  } = nft;

  let data;
  let newUri = "";

  try {
    const url = setupURI(uri);
    const res = await axios(proxy + url).catch((e) => ({ data: undefined }));
    data = res.data;
  } catch (e) {
    try {
      const res = await axios(
        proxy + `https://api.ton.cat/v2/contracts/nft/${address}`
      ).catch((e) => ({ data: undefined }));

      data = res.data?.nft_item?.metadata;
      newUri = res.data?.nft_item["content_url"] as string;
    } catch (error: any) {
      console.log(error?.message || "parse timeout forest");
      return {
        ...nft,
        ...(error?.response?.status === 404 ? { errorStatus: 404 } : {}),
      };
    }
  }

  try {
    const imgUrl = setupURI(
      native?.image ||
        data.image?.original ||
        (typeof data?.image === "string" && data?.image)
    );

    const nftRes: NFT = {
      native: {
        ...native,
        uri: newUri || uri,
      },
      chainId,
      tokenId,
      owner: account,
      uri: newUri || uri,
      contract,
      collectionIdent,
      metaData: {
        whitelisted,
        image: imgUrl,
        imageFormat: imgUrl.match(/\.([^.]*)$/)?.at(1) as string,
        description: data?.description,
        name: data?.name || native.name,
        attributes: data?.attributes,
        collectionName: native.collectionName,
      },
    };

    return nftRes;
  } catch (e: any) {
    console.log(e?.message || e, "in ton Parser");
  }
};
