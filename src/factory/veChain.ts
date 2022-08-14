import { stringify } from "querystring";
import BigNumber from "bignumber.js";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import requestPool from "../../tools/requestPool";
import { NFT, setupURI } from ".";
import * as evm from "./index";
import { checkEmptyFromTezos } from "./tezos";

import { fromBuffer } from "file-type";

import { proxy } from "..";

const pool = requestPool(3000);
const cheerio = require("cherio");

export const veChainParser = async (
  collectionIdent: string,
  nft: any,
  account: string,
  whitelisted: boolean,
  chainId?: string
) => {
  let parsed;
  switch (true) {
    case /0x5E6265680087520DC022d75f4C45F9CCD712BA97/.test(collectionIdent):
      parsed = await WOVY(nft, account, whitelisted);
      break;

    case /0xf0E778BD5C4c2F219A2A5699e3AfD2D82D50E271/.test(collectionIdent):
      parsed = await WrappedXPNET(nft, account, whitelisted);
      break;

    case /0x2FD3d1E1a3F1E072c89d67301a86a5ba850Ccd4E/.test(collectionIdent):
      parsed = await Anon(nft, account, whitelisted);
      break;

    case /0x3473c5282057D7BeDA96C1ce0FE708e890764009/.test(collectionIdent):
      parsed = await Planet(nft, account, whitelisted);
      break;

    case /(0x38914ed8E9AB65554A23CcF285dfd212C13795cE|0x4E9eB6f6e04464eEe33Ae04Bf430E20529482e60|0x1d971Ac972F671c19D1bE00E4Fbf3118d3861851)/.test(
      collectionIdent
    ):
      parsed = await Forest(nft, account, whitelisted);
      break;

    default:
      parsed = await evm.Default(nft, account, whitelisted);
      break;
  }

  return parsed;
};

const Planet = async (nft: any, account: string, whitelisted: boolean) => {
  const {
    native,
    native: { contract, tokenId, chainId },
    collectionIdent,
    uri,
  } = nft;

  const gqlQuery = (tokenId: string) => ({
    query:
      "\n    \n    fragment CollectionFields on TokenMarketplaceDTO {\n        collection {\n            collectionId\n            blockchainId\n            smartContractAddress\n            stakingContractAddresses\n            creatorAddress\n            name\n            customUrl\n            thumbnailImageUrl\n            placeholderImageUrl\n            isVerified\n            isVisible\n            isRevealed\n            type\n            importedAt\n            config\n        }\n    }\n\n    \n    fragment CreatorFields on TokenMarketplaceDTO {\n        creator {\n            address\n            name\n            customUrl\n            ipfsFileHash\n            profileImageUrl\n            blacklisted\n            verified\n            verifiedLevel\n        }\n    }\n\n    \n    fragment MediaFields on TokenMarketplaceDTO {\n        media {\n            url\n            mimeType\n            sizeType\n        }\n    }\n\n\n    query GetToken(\n        $tokenId: String!\n        $smartContractAddress: String!\n    ) {\n        token: getToken(\n            tokenId: $tokenId\n            smartContractAddress: $smartContractAddress\n        ) {\n            \ntokenId\nsmartContractAddress\nname\ndescription\ncreatorAddress\neditionsCount\nroyalty\nfileType\nfileUrl\nmetadataUrl\nmintedAt\nattributes\nscore\nrank\n...CollectionFields\n...CreatorFields\n...MediaFields\n\n        }\n    }\n",
    variables: {
      tokenId,
      smartContractAddress: "0x3473c5282057D7BeDA96C1ce0FE708e890764009",
    },
    operationName: "GetToken",
  });

  try {
    const response = await axios(
      `${proxy}https://mainnet.api.worldofv.art/graphql`,
      {
        method: "post",
        data: gqlQuery(tokenId),
      }
    ).catch((e) => {
      return {
        data: null,
      };
    });

    let { data } = response;

    data = data?.data?.token;

    data = await checkEmptyFromTezos(data);

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
        image: setupURI(data?.fileUrl),
        imageFormat: data.fileUrl.match(/\.([^.]*)$/)?.at(1) || "jpg",
        description: data?.escription,
        name: data?.name,
        attributes: data?.attributes,
        collectionName: "Exoworlds New",
      },
    };
    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};

const WOVY = async (nft: any, account: string, whitelisted: boolean) => {
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

    const $ = cheerio.load(response.data);

    const script = $("#__NEXT_DATA__");

    const json = JSON.parse(script.get()[0].children[0].data);

    const metadata = json?.props?.pageProps?.token?.token;

    const src = setupURI(metadata.fileUrl);

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: metadata.wrapped,
      metaData: {
        whitelisted,
        image: src,
        imageFormat: "",
        description: metadata.description,
        animation_url: src,
        animation_url_format: "mp4",
        name: metadata.name,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};

const Anon = async (nft: any, account: string, whitelisted: boolean) => {
  const {
    native,
    native: { contract, tokenId, chainId },
    collectionIdent,
    uri,
  } = nft;

  try {
    const response = await axios(
      `${proxy}${`https://blackv2.mypinata.cloud/ipfs/QmNrySrtR9E9VfnNGoJqohTvZh4K6Bo79L3eonRVk3xwUs/${tokenId}.json`}`
    ).catch(() => ({
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
      wrapped: data.wrapped,
      metaData: {
        whitelisted,
        image: `https://blackv2.mypinata.cloud/ipfs/QmNrySrtR9E9VfnNGoJqohTvZh4K6Bo79L3eonRVk3xwUs/${tokenId}.png`,
        imageFormat: "png",
        description: data?.description,
        name: "Venonymous " + data?.name,
        symbol: "VENONYMOUS",
        collectionName: "Venonymous",
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
    const response = await axios(`${proxy}${setupURI(uri)}`).catch(() => ({
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
      wrapped: data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: data.image?.match(/\.([^.]*)$/)?.at(1),
        description: data.description,
        name: data.name,
        symbol: data.symbol,
        attributes: data.attributes,
        contractType: data.type,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};

const Forest = async (nft: any, account: string, whitelisted: boolean) => {
  const {
    native,
    native: { contract, tokenId, chainId },
    collectionIdent,
    uri,
  } = nft;

  try {
    const response = proxy
      ? ((await pool.addRequest(`${proxy}${setupURI(uri)}`)) as AxiosResponse<
          any,
          any
        >)
      : await axios(`${proxy}${setupURI(uri)}`);

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
      wrapped: data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: data.image?.match(/\.([^.]*)$/)?.at(1),
        description: data.description,
        name: data?.name,
        symbol: data.symbol,
        attributes: data.attributes,
        contractType: data.type,
        collectionName: data?.compiler,
      },
    };
    return nft;
  } catch (error: any) {
    console.log(error.message || "parse timeout forest");
    return nft;
  }
};

/**
 * 
 * {
    "query": "\n            query itemList($filter:Filter, $page:Int, $perPage:Int, $sort:Sort){\n              itemList(filter:$filter, page:$page, perPage:$perPage, sortBy:$sort) {\n                    PlanetID\n                    PlanetName\n                    Image\n                    PlanetSector\n                    PlanetCoordinates\n                    Background\n                    BackgroundStarDensity\n                    BackgroundNebula\n                    SystemType\n                    StarOneType\n                    StarOneSpectralClass\n                    StarOneSpectralNumber\n                    StarOneSequence\n                    StarTwoType\n                    StarTwoSpectralClass\n                    StarTwoSpectralNumber\n                    StarTwoSequence\n                    StarThreeType\n                    StarThreeSpectralClass\n                    StarThreeSpectralNumber\n                    StarThreeSequence\n                    ExoClass\n                    MotherPlanetType\n                    MotherPlanetSubtype\n                    WorldType\n                    WorldSubtype\n                    Moons\n                    MoonOneType\n                    MoonTwoType\n                    MoonThreeType\n                    Ring\n                    RingType\n                    BioDiversityScale\n                    CarniverousVegetation\n                    SecretBiosphere\n                    Gaia\n                    IntelligentMicrobiome\n                    ApexPredators\n                    SentientLifeFormType\n                    FitnessFactor\n                    IntelligenceCapacity\n                    ConciousnessAffinity\n                    RarityScore\n                    Rank\n                    TokenOwner\n                    ItemID\n                    StartTime\n                    EndTime\n                    ReserveTokenPrice\n                    BuyoutTokenPrice\n                    ListingType\n                    Neighbor1\n                    Neighbor2\n                    Neighbor3\n                    Neighbor4\n                    Neighbor5\n                    Neighbor6\n                    Neighbor7\n                    Neighbor8\n                    Neighbor9\n                    Neighbor10\n                }\n            }",
    "variables": {
        "filter": {},
        "perPage": 20,
        "page": 0,
        "sort": {
            "OrderBy": "BuyoutTokenPrice",
            "OrderDirection": 1
        }
    },
    "operationName": "itemList"
}
 */
