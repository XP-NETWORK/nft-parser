import BigNumber from "bignumber.js";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { nftGeneralParser } from "..";
import { setupURI, proxy } from ".";
import { url } from "inspector";

interface NFT {
    chainId: string;
    tokenId: string;
    owner: string;
    uri: string;
    contract: string;
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
        const headers = await (await axios(uri)).headers;

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
                image: format === "mp4" ? "" : uri,
                imageFormat: format,
                animation_url: format === "png" ? "" : uri,
                //animation_url_format: "mp4",
            },
        };

        return nft;
    } catch (error) {
        console.error(error);
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
