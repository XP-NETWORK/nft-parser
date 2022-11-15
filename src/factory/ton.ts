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

export const tonParser = async (
  collectionIdent: string,
  nft: any,
  account: string,
  whitelisted: boolean,
  chainId?: string
) => {
  let parsed;
  switch (true) {
    default:
      parsed = await Default(nft, account, whitelisted);
      break;
  }

  return parsed;
};

const Default = async (nft: any, account: string, whitelisted: boolean) => {
  const {
    native,
    native: { contract, tokenId, chainId, address },
    collectionIdent,
    uri,
  } = nft;

  let data;

  try {
    const url = setupURI(uri);

    const res = await axios(proxy + url).catch((e) => ({ data: undefined }));

    data = res.data;
  } catch (e) {
    try {
      const res = await axios(
        proxy + `https://api.ton.cat/v2/contracts/nft/${address}`
      ).catch((e) => ({ data: undefined }));

      data = res.data?.nft_item?.metadata;
    } catch (error: any) {
      console.log(error?.message || "parse timeout forest");
      return {
        ...nft,
        ...(error?.response?.status === 404 ? { errorStatus: 404 } : {}),
      };
    }
  }

  const nftRes: NFT = {
    native,
    chainId,
    tokenId,
    owner: account,
    uri,
    contract,
    collectionIdent,
    metaData: {
      whitelisted,
      image: setupURI(native.image),
      imageFormat: native.image?.match(/\.([^.]*)$/)?.at(1),
      description: data?.description,
      name: data?.name || native.name,
      attributes: data?.attributes,
      collectionName: native.collectionName,
    },
  };

  return nftRes;
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
