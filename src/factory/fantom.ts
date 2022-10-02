import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { NFT, setupURI } from ".";

import { checkEmptyFromTezos } from "./tezos";

import { proxy } from "..";

import { Default } from "./index";

export const fantomParser = async (
  collectionIdent: string,
  nft: any,
  account: string,
  whitelisted: boolean,
  chainId?: string
) => {
  let parsed;

  switch (collectionIdent) {
    case "0xb3bd794bd00e1711c55ceb5c452d74c0d8be292d":
      parsed = await Falacy(nft, account, whitelisted);
      break;

    case "0xcFa4d04d1CCbE4dda0635DEDB61601B50B13AD8e":
      parsed = await Runner(nft, account, whitelisted);
      break;

    default:
      parsed = await Default(nft, account, whitelisted);
      break;
  }

  return parsed;
};

const Runner = async (nft: any, account: string, whitelisted: boolean) => {
  const {
    native,
    native: { contract, tokenId, chainId },
    collectionIdent,
    uri,
  } = nft;

  try {
    const res = await axios(
      `${proxy}${uri.replace("ipfs.moralis.io:2053", "ipfs.io")}`
    );

    const { data } = res;

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data?.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data?.image),
        imageFormat: "png",
        description: data?.description,
        name: data?.name,
        attributes: data?.attributes,
      },
    };
    return nft;
  } catch (error) {
    console.log(error);

    return nft;
  }
};

const Falacy = async (nft: any, account: string, whitelisted: boolean) => {
  const {
    native,
    native: { contract, tokenId, chainId },
    collectionIdent,
    uri,
  } = nft;

  try {
    const res = await axios(`${proxy}${uri}`);

    const { data } = res;

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data?.wrapped,
      metaData: {
        whitelisted,
        image: `https://ipfs.moralis.io:2053/ipfs/${data.image.replace(
          "ipfs://",
          ""
        )}`,
        imageFormat: "png",
        description: data?.description,
        name: data?.name,
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
    const response = await axios(`${proxy}${uri}`).catch(() => ({
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
      wrapped: data?.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data?.image),
        imageFormat: "png",
        description: data?.description,
        name: data?.name,
        symbol: data?.symbol,
        attributes: data?.attributes,
        contractType: data?.type,
      },
    };
    return nft;
  } catch (error: any) {
    return {
      ...nft,
      ...(error.response?.status === 404 ? { errorStatus: 404 } : {}),
    };
  }
};
