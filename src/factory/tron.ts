import { stringify } from "querystring";
import BigNumber from "bignumber.js";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { nftGeneralParser } from "..";
import requestPool from "../../tools/requestPool";
import { setupURI } from ".";
import { getAssetFormat } from "../../tools/helpers";
import { proxy, apenftKey, apenftSign } from "..";

const pool = requestPool(3000);

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

export const tronParser = async (
  collectionIdent: string,
  nft: any,
  account: any,
  whitelisted: boolean
) => {
  let parsed;
  switch (collectionIdent) {
    case "TGkgcveyPzhzj18dtxpzaAtcL5ZUB8965A": {
      parsed = await SpaceClub(nft, account, whitelisted);
      break;
    }

    default:
      parsed = await Default(nft, account, whitelisted);
      break;
  }
  return parsed;
};

export const SpaceClub = async (
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

  const query = {
    operationName: "assetsDetail",
    variables: {
      blockChain: {
        chain: "tron",
        chainId: "0x2b6653dc",
      },
      contractAddress: "TGkgcveyPzhzj18dtxpzaAtcL5ZUB8965A",
      tokenId: String(tokenId),
    },
    query:
      "query assetsDetail($blockChain: BlockChainInput!, $contractAddress: Address!, $tokenId: String!, $thirdStandards: [String!]) {\n  asset(\n    identity: {blockChain: $blockChain, contractAddress: $contractAddress, tokenId: $tokenId}\n  ) {\n    id\n    chain\n    chainId\n    contractAddress\n    tokenId\n    tokenType\n    creatorAddress\n    collectionId\n    name\n    description\n    imageUrl\n    imagePreviewUrl\n    imageThumbnailUrl\n    animationUrl\n    externalUrls\n    unlockContentEnable\n    ownedQuantity\n    ownershipCount\n    quantity\n    properties {\n      key\n      value\n      traitCount\n      traitTotal\n      traitSupply\n      __typename\n    }\n    levels {\n      key\n      value\n      max\n      __typename\n    }\n    stats {\n      key\n      value\n      max\n      __typename\n    }\n    supply\n    tradeSummary(thirdStandards: $thirdStandards) {\n      lastSale {\n        lastSalePrice\n        lastSaleTokenContract {\n          id\n          name\n          address\n          icon\n          decimal\n          symbol\n          accuracy\n          __typename\n        }\n        __typename\n      }\n      bestBid {\n        bestBidPrice\n        bestBidToken\n        bestBidPriceBase\n        bestBidPriceUSD\n        bestBidPriceCNY\n        bestBidCreatedDate\n        bestBidOrderString\n        bestBidOrderQuantity\n        bestBidTokenContract {\n          id\n          name\n          address\n          icon\n          decimal\n          symbol\n          accuracy\n          __typename\n        }\n        __typename\n      }\n      bestAsk {\n        bestAskSaleKind\n        bestAskPrice\n        bestAskToken\n        bestAskPriceBase\n        bestAskPriceUSD\n        bestAskExpirationDate\n        bestAskOrderString\n        bestAskOrderType\n        bestAskOrderQuantity\n        bestAskTokenContract {\n          id\n          name\n          address\n          icon\n          decimal\n          symbol\n          accuracy\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    assetOwners(first: 1) {\n      edges {\n        cursor\n        node {\n          chain\n          chainId\n          owner\n          balance\n          account {\n            identity {\n              address\n              blockChain {\n                chain\n                chainId\n                __typename\n              }\n              __typename\n            }\n            user {\n              id\n              address\n              profileImageUrl\n              userName\n              __typename\n            }\n            info {\n              profileImageUrl\n              userName\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    creator {\n      identity {\n        address\n        blockChain {\n          chain\n          chainId\n          __typename\n        }\n        __typename\n      }\n      user {\n        id\n        address\n        profileImageUrl\n        userName\n        __typename\n      }\n      info {\n        profileImageUrl\n        userName\n        __typename\n      }\n      __typename\n    }\n    paymentTokens {\n      id\n      name\n      address\n      icon\n      symbol\n      chain\n      chainId\n      decimal\n      __typename\n    }\n    collection {\n      id\n      name\n      slug\n      description\n      imageUrl\n      bannerImageUrl\n      featuredImageUrl\n      externalUrl\n      weiboUrl\n      twitterUrl\n      instagramUrl\n      mediumUrl\n      telegramUrl\n      discordUrl\n      facebookUrl\n      paymentTokens {\n        id\n        name\n        icon\n        symbol\n        chain\n        chainId\n        decimal\n        address\n        __typename\n      }\n      isVerified\n      royalty\n      royaltyAddress\n      __typename\n    }\n    uri\n    isFavorite\n    favoriteQuantity\n    __typename\n  }\n}\n",
  };

  try {
    const res = await axios.post(
      proxy + "https://api.apenft.io/graphql",
      query,
      {
        headers: {
          "x-api-key": apenftKey,
          "x-api-sign": apenftSign,
        },
      }
    );

    const asset = res?.data?.data?.asset;

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: null,
      metaData: {
        whitelisted,
        image: asset?.imageUrl,
        imageFormat: asset?.imageUrl?.match(/(?:\.([^.]+))?$/)?.at(1),
        attributes: asset?.properties,
        description: asset.description,
        name: asset.name,
        contractType: asset.tokenType,
      },
    };
    return nft;
  } catch (error: any) {
    console.error(error.code || error.status);
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
  const baseUrl = uri;
  const url = `${proxy}${setupURI(uri)}`;
  try {
    const response = await axios(url);
    const { data } = response;

    const format = await getAssetFormat(data.image);

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
        imageFormat: format,
        attributes: data.attributes,
        description: data.description,
        name: data.name,
      },
    };
    return nft;
  } catch (error: any) {
    console.error(error);
    return {
      ...nft,
      ...(error.response?.status === 404 ? { errorStatus: 404 } : {}),
    };
  }
};
