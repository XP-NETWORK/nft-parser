import axios from "axios";

import { setupURI } from "../src/factory";

import { proxy } from "../src";

import { fromBuffer } from "file-type";
import { rejects } from "assert";

export const getWrappedNft = async (
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

  const res = await axios(`https://nft.xp.network/w/${tokenId}`);
  const { data } = res;

  return {
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
      imageFormat: data?.image?.match(/(?:\.([^.]+))?$/)[1],
      attributes: data?.attributes,
      description: data?.description,
      name: data?.name,
    },
  };
};

export const getAssetFormat = async (imageUri: string): Promise<any> => {
  try {
    const formats = [".mp4", ".ogg", ".webm", ".avi", ".apng", ".gif", ".jpg", ".jpeg", ".png", ".svg", ".mov", ".webp",];
    let format = ""
    formats.some(substring => {
      if (imageUri.includes(substring)) {
        format = substring
      }
    })
    return format;
  } catch (e: any) {
    console.log(e.message, "reading format");
    throw e;
  }
};
