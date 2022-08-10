import BigNumber from "bignumber.js";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { nftGeneralParser } from "..";
import { setupURI } from ".";
import { url } from "inspector";

import { proxy } from "..";

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

export const DEFAULT = async (
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

  try {
    console.log("doritos");
    const { data } = await axios(uri);
    const headers = data.headers;

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
        image: format.includes("json")
          ? uri.replace(".json", ".png")
          : format.includes("png")
          ? uri
          : format.includes("mp4")
          ? ""
          : "",
        imageFormat: "png",
        animation_url: format.includes("png")
          ? ""
          : format.includes("json")
          ? uri.replace(".json", ".mp4")
          : format.includes("mp4")
          ? uri
          : "",

        animation_url_format: "mp4",
      },
    };

    return nft;
  } catch (error: any) {
    console.error(error?.response?.status);
    return nft;
  }
};

export const AERMES = async (
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

  try {
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
        animation_url: uri,
        animation_url_format: "mp4",
      },
    };

    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};

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

  try {
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
        image: uri.replace(".json", ".png"),
        imageFormat: "png",
      },
    };

    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};

export const APOPHIS = async (
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

  try {
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
        image: uri.replace(".json", ".png"),
        imageFormat: "png",
      },
    };

    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};

export const INNOVATOR = async (
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

  try {
    const { data } = await axios(uri);

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
        image: data.image,
        imageFormat: "png",
        name: data.name,
      },
    };

    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};

export const MEDUSA = async (
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

  try {
    const { data } = await axios(uri);

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
        imageFormat: "png",
        name: data.name,
        attributes: data.attributes,
        description: data.description,
      },
    };

    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};

export const ORC = async (
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

  try {
    const { data } = await axios(proxy + uri);

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
        image: uri.replace(".json", ".png"),
        imageFormat: "png",
        attributes: data.attributes,
        description: data.description,
      },
    };

    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};

export const KINGSGUARD = async (
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

  try {
    //const { data } = await axios(proxy + uri);

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
        image: `https://media.elrond.com/nfts/asset/QmbtT4ca7TjE8fKd9ufkNm3H2sD9caz4GZ7VPn76Burx4J/${uri
          .match(/([^\/]+$)/)
          ?.at(0)
          .replace(/\D+/, "")}.jpg`,
        imageFormat: "jpg",
      },
    };

    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};

//KINGSGUARD

export const ALIEN = ORC;

export const WrappedXPNET = async (
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

  try {
    const { data } = await axios(proxy + uri);

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
        image: data.image,
        imageFormat: data.image?.match(/\.([^.]*)$/)?.at(1),
        name: data.name,
        attributes: data.attributes,
        description: data.description,
        ...(data.animation_url ? { animation_url: data.animation_url } : {}),
        ...(data.animation_url
          ? {
              animation_url_format: data.animation_url
                ?.match(/\.([^.]*)$/)
                ?.at(1),
            }
          : {}),
      },
    };

    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
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

  try {
    let data;

    if (/(png|jpe?g)/.test(uri)) {
      data = {
        image: setupURI(uri),
      };
    } else {
      const res = await axios(proxy + uri);
      data = res.data;
    }

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
        image: data.image,
        imageFormat: data.image?.match(/\.([^.]*)$/)?.at(1),
        name: data.name,
        attributes: data.attributes,
        description: data.description,
        ...(data.animation_url ? { animation_url: data.animation_url } : {}),
        ...(data.animation_url
          ? {
              animation_url_format: data.animation_url
                ?.match(/\.([^.]*)$/)
                ?.at(1),
            }
          : {}),
      },
    };

    return nft;
  } catch (error: any) {
    console.error(error?.response?.status);
    return nft;
  }
};
