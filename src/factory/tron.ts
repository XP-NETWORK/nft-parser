import { stringify } from "querystring";
import BigNumber from "bignumber.js";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { nftGeneralParser } from "..";
import requestPool from "../../tools/requestPool";
import { setupURI } from ".";

import { proxy } from "..";

const pool = requestPool(3000);

interface NFT {
  chainId: string;
  tokenId: string;
  owner: string;
  uri: string;
  contract: string;
  collectionIdent: string;
  native: any;
  wrapped?: any;
  metaData: {
    whitelisted: boolean;
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

export const tronParser = async (
  collectionIdent: string,
  nft: any,
  account: any,
  whitelisted: boolean
) => {
  let parsed;
  switch (collectionIdent) {
    default:
      parsed = await Default(nft, account, whitelisted);
      break;
  }
  return parsed;
};

export const Default = async (
  nft: any,
  account: string,
  whitelisted: boolean
): Promise<NFT> => {
  const {
    native,
    native: { contract, tokenId, chainId },
    collectionIdent,
    uri,
  } = nft;
  const baseUrl = uri;
  const url = `${proxy}${setupURI(uri)}`;
  try {
    const response = await axios(url);
    const { data } = response;
    const { headers } = await axios(`${proxy}${setupURI(data.image)}`);
    const format = headers["content-type"].slice(
      headers["content-type"].lastIndexOf("/") + 1
    );
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
        imageFormat: format,
        attributes: data.attributes,
        description: data.description,
        name: data.name,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
