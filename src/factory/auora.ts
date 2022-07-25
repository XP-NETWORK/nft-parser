import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { proxy, NFT, setupURI } from ".";

import { Default } from "./index";

const cheerio = require("cherio");

export const auroraParser = async (
  collectionIdent: string,
  nft: any,
  account: string,
  whitelisted: boolean,
  chainId?: string
) => {
  let parsed;
  switch (true) {
    case /(0xF4823Ffa8133f6B27c7e3A5218B40a9087B6d2c7|0x1797C36a07D234DC9e342fb828031f7Ed297e75F|0x5BF4017DFe679c13910236427509fd088f8D6138|0x88976c2A0AF6f969d51E2e757AfD5bDaDaC5D6C5|0x486a92035a73de83f393DBfFa2C1a72e047203E9)/.test(
      collectionIdent
    ):
      parsed = await Virtual(nft, account, whitelisted);
      break;

    default:
      parsed = await Default(nft, account, whitelisted);
      break;
  }

  return parsed;
};

const Virtual = async (nft: any, account: string, whitelisted: boolean) => {
  const {
    native,
    native: { contract, tokenId, chainId },
    collectionIdent,
    uri,
  } = nft;

  try {
    const response = await axios(
      `${proxy}https://explorer.mainnet.aurora.dev/token/${collectionIdent}/instance/${tokenId}/metadata`
    );

    const $ = cheerio.load(response.data);

    const code = $(".card code").text();
    const collection = $(".card .card-body .card-title a").text();
    const meta = JSON.parse(code);

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: meta && meta.wrapped,
      metaData: {
        whitelisted,
        image: meta && meta.image,
        imageFormat: "png",
        attributes: meta && meta.attributes,
        description: meta && meta.description,
        animation_url: meta && meta["animation_url"],
        name: meta && meta.name,
        collectionName: collection || "Virtual Reality 3D NFTs",
        symbol: "vr3DNFTs",
      },
    };

    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};
