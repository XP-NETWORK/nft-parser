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

export const getAssetFormat = async (imageUri: string): Promise<string> => {
  if (!imageUri) {
    throw new Error("no url:");
  }
  let format = "";
  try {
    if (/(\.png$|\.jpe?g$|\.gif$|\.mp4$|\.avi$|\.webm$)/.test(imageUri)) {
      format = imageUri.match(/(?:\.([^.]+))?$/)?.at(1) || "";
    } else {
      if (proxy) {
        const { headers } = await axios(`${proxy}${setupURI(imageUri)}`);

        format = headers["content-type"].slice(
          headers["content-type"].lastIndexOf("/") + 1
        );
      } else {
        format = await new Promise(async (resolve, reject) => {
          const stream = await axios
            .get(`${proxy}${setupURI(imageUri)}`, {
              responseType: "stream",
              timeout: 3000,
            })
            .catch((e: any) => {
              reject(e);
            });

          stream?.data?.on("data", async (chunk: ArrayBuffer) => {
            const res = await fromBuffer(chunk).catch((e) => reject(e));
            stream?.data?.destroy();

            if (res?.ext === "heic") return reject("heic format");
            resolve(res?.ext || "");
          });
        });
      }
    }

    return format;
  } catch (e: any) {
    console.log(e.message, "reading format");
    throw e;
  }
};
