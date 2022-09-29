import BigNumber from "bignumber.js";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getAssetFormat, nftGeneralParser } from "..";
import { setupURI } from ".";
import { url } from "inspector";

import { proxy } from "..";
import { symbolName } from "typescript";

interface NFT {
  chainId: string;
  tokenId: string;
  owner: string;
  uri: string;
  contract: string;
  collectionIdent: string;
  native: any;
  wrapped?: any;
  errorStatus?: number;
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
    collectionName?: string;
  };
}

export const elrondParser = async (
  collectionIdent: string,
  nft: any,
  account: string,
  whitelisted: boolean
) => {
  let parsed;

  switch (collectionIdent) {
    case "AERMES-ac9886": {
      parsed = await AERMES(nft, account, whitelisted);
      break;
    }
    case "DRIFTERS-efd96c": {
      parsed = await DRIFTERS(nft, account, whitelisted);
      break;
    }

    case "NIFTYREX-d8c812": {
      parsed = await DRIFTERS(nft, account, whitelisted);
      break;
    }

    case "INNOVATOR-fca3a7": {
      parsed = await INNOVATOR(nft, account, whitelisted);
      break;
    }

    case "CGPASS-73ac68": {
      parsed = await MEDUSA(nft, account, whitelisted);
      break;
    }

    case "ORC-ef544d": {
      parsed = await ORC(nft, account, whitelisted);
      break;
    }

    case "STRAYCATS-b079a7": {
      parsed = await WrappedXPNET(nft, account, whitelisted);
      break;
    }

    case "PMONC-4032bc": {
      parsed = await WrappedXPNET(nft, account, whitelisted);
      break;
    }

    case "TAKANNE-3db244": {
      parsed = await APOPHIS(nft, account, whitelisted);
      break;
    }

    case "KINGSGUARD-8e5d07": {
      parsed = await KINGSGUARD(nft, account, whitelisted);
      break;
    }

    case "ALIEN-a499ab": {
      parsed = await ALIEN(nft, account, whitelisted);
      break;
    }

    case "HOKIZUKI-2fe117": {
      parsed = await HOKI(nft, account, whitelisted);
      break;
    }

    case "NBERGS-139351": {
      parsed = await NBERGS(nft, account, whitelisted);
      break;
    }

    default:
      parsed = await DEFAULT(nft, account, whitelisted);
      break;
  }
  return parsed;
};

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
    const format = await getAssetFormat(setupURI(uri));

    //const { data } = await axios(uri);
    //const headers = data.headers;

    // const format = headers["content-type"].slice(
    // headers["content-type"].lastIndexOf("/") + 1
    //);

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
    console.error(error?.response?.status || error);
    return {
      ...nft,
      ...(error.response?.status === 404 ? { errorStatus: 404 } : {}),
    };
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

///https://ipfs.io/ipfs/QmcnUiaXw3Gjy1cXDnXTnhWahW2h4kqJiXp88wya9yJYj9/5437.json

export const NBERGS = async (
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
  console.log("dora");
  try {
    const { data } = await axios(proxy + uri);

    console.log(data);

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
        image: `https://ipfs.io/ipfs/QmcnUiaXw3Gjy1cXDnXTnhWahW2h4kqJiXp88wya9yJYj9/${uri
          .match(/\d+(?=\.json)/)
          ?.at(0)}.png`,
        imageFormat: "png",
        name: data?.name,
        attributes: data?.attributes,
        description: data?.description,
        collectionName: "Nicebergs NFT",
      },
    };

    return nft;
  } catch (error: any) {
    console.log(error?.message);
    return {
      ...nft,
      ...(error.response?.status === 404 ? { errorStatus: 404 } : {}),
    };
  }
};

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

export const HOKI = async (
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
        image: setupURI(
          data.image.replace(
            "NewUriToReplace",
            "QmcnpaWrFmJjiq7nSnomyogsL5CVHjmTL1HLFeKeTz3Fia"
          )
        ),
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
    return {
      ...nft,
      errorStatus: 429,
    };
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

  console.log("ds");

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
    console.error(error?.response?.status || error);
    return nft;
  }
};
