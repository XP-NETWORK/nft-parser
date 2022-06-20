import { Provider } from "@ethersproject/abstract-provider";
import { stringify } from "querystring";
import {
  ChainFactoryConfigs,
  ChainFactory,
  Chain,
  AppConfigs,
  ChainParams,
} from "xp.network";
import BigNumber from "bignumber.js";
import { Interface } from "@ethersproject/abi";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { nftGeneralParser } from "..";
import { setupURI, proxy } from ".";

interface NFT {
  chainId: string;
  tokenId: string;
  owner: string;
  uri: string;
  contract?: string;
  collectionIdent: string;
  native: any;
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

export const DRIFTERS = async (
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
    const { headers } = await axios(`${proxy}${data.image}`);
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
      metaData: {
        whitelisted,
        image: data.image,
        imageFormat: format,
        attributes: data.attributes,
        name: data.name,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
