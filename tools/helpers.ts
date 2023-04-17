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

export const isAsset = (imageUri: string) =>
    /(\.png$|\.jpe?g$|\.gif$|\.mp4$|\.avi$|\.webm$|\.svg$)/.test(imageUri);

export const extractType = (imageUri: string) =>
    imageUri.match(/(?:\.([^.]+))?$/)?.at(1) || "";

export const getAssetFormat = async (imageUri: string): Promise<string> => {
    if (!imageUri) {
        throw new Error("no url:");
    }
    let format = "";
    try {
        if (isAsset(imageUri)) {
            format = extractType(imageUri);
        } else {
            if (proxy) {
                const { headers } = await axios(
                    `${proxy}${setupURI(imageUri)}`
                );

                format = headers["content-type"].slice(
                    headers["content-type"].lastIndexOf("/") + 1
                );
            } else {
                format = await new Promise(async (resolve, reject) => {
                    const stream = await tryPinataWrapper((url: string) =>
                        axios.get(url, {
                            responseType: "stream",
                            timeout: 3000,
                        })
                    )(setupURI(imageUri)).catch((e) => reject(e));

                    stream?.data?.on("data", async (chunk: ArrayBuffer) => {
                        const res = await fromBuffer(chunk).catch((e) =>
                            reject(e)
                        );
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

const retryCodes = "(429|503)";

export const tryPinataWrapper =
    (cb: (url: string) => Promise<any>) => async (url: string) => {
        return await cb(proxy + url).catch((e) => {
            if (
                new RegExp(retryCodes).test(e.message) &&
                /^https:\/\/ipfs.io/.test(url)
            ) {
                return cb(
                    proxy +
                        url.replace(
                            /^https:\/\/ipfs.io/,
                            "https://xpnetwork.infura-ipfs.io"
                        )
                );
            }
            throw e;
        });
    };
