import axios from "axios";

import requestPool from "../../tools/requestPool";
import { NFT, setupURI } from ".";
import { extractType } from "..";
import { proxy } from "..";

export const tonParser = async (
    _: string,
    nft: any,
    account: string,
    whitelisted: boolean
) => {
    let parsed;

    switch (true) {
        case /^tonstorage/.test(nft.uri): {
            parsed = await TonStorage(nft, account, whitelisted);
            break;
        }

        default:
            parsed = await Default(nft, account, whitelisted);
            break;
    }

    return parsed;
};

const getNFTfromTonApi = async (address: string) => {
    const res = await axios(
        proxy + `https://api.ton.cat/v2/contracts/nft/${address}`
    ).catch((e) => {
        console.log(e, "e");
        return { data: undefined };
    });

    return res;
};

const Default = async (nft: any, account: string, whitelisted: boolean) => {
    const {
        native,
        native: { contract, tokenId, chainId },
        uri,
    } = nft;

    let data;
    let newUri = "";
    let collectionAddress = "";

    try {
        const url = setupURI(uri);

        const res = await axios(
            (url.match(/^data\:application/) ? "" : proxy) + url
        ).catch((e) => ({
            data: undefined,
        }));

        data = res.data;
    } catch (e) {
        try {
            const res = await getNFTfromTonApi(tokenId);
            data = res.data?.nft_item?.metadata;
            newUri = res.data?.nft_item["content_url"] as string;
            collectionAddress =
                res.data?.nft_item["collection_address"] || "SingleNFt";
        } catch (error: any) {
            console.log(error?.message || "parse timeout forest");
            return {
                ...nft,
                ...(error?.response?.status === 404
                    ? { errorStatus: 404 }
                    : {}),
            };
        }
    }

    try {
        const imgUrl = setupURI(
            native?.image ||
                data.image?.original ||
                (typeof data?.image === "string" && data?.image)
        );

        let _contract: string;

        if (tokenId === contract) {
            if (collectionAddress) {
                _contract = collectionAddress;
            } else {
                const res = await getNFTfromTonApi(tokenId);
                _contract =
                    res.data?.nft_item["collection_address"] || "SingleNFt";
            }
        } else {
            _contract = contract;
        }

        const nftRes: NFT = {
            native: {
                ...native,
                uri: newUri || uri,
            },
            chainId,
            tokenId,
            owner: account,
            uri: newUri || uri,
            contract: _contract,
            collectionIdent: _contract,
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

const TonStorage = async (nft: any, account: string, whitelisted: boolean) => {
    const {
        native: { tokenId },
        wrapped,
    } = nft;

    try {
        const address = encodeURIComponent(
            wrapped ? wrapped.item_address : tokenId
        );

        const uri = `https://tonapi.io/v2/nfts/${address}`;
        const res = (await axios(uri)).data;
        if (res) {
            const image = res.previews?.at(-1)?.url;
            const nftRes: NFT = {
                ...nft,
                owner: account,
                uri,
                metaData: {
                    whitelisted,
                    image,
                    imageFormat: extractType(image),
                    description: res.collection?.description,
                    name: res.collection?.name,
                    attributes: res.metadata?.attributes,
                    collectionName: res.metadata?.name,
                },
            };

            return nftRes;
        }
    } catch (e) {
        //console.log(e, "e");
        return nft;
    }
};
