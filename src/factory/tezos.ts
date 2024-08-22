import { setupURI } from ".";
import { bytes2Char } from "@taquito/utils";
import {
  BigMapAbstraction,
  MichelCodecPacker,
  MichelsonMap,
  OperationContent,
  TezosToolkit,
} from "@taquito/taquito";

import axios from "axios";
import { proxy } from "..";

import { getAssetFormat } from "../../tools/helpers";

interface NFT {
  native: any;
  chainId: string;
  tokenId: string;
  owner: string;
  uri: string;
  contract?: string;
  collectionIdent: string;
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

const tezos = new TezosToolkit("https://mainnet.smartpy.io/");

export const checkEmptyFromTezos = async (data: any) => {
  if (!data?.image && data?.wrapped?.origin === "18") {
    try {
      const contract = await tezos.contract.at(data?.wrapped?.contract);
      const storage = (await contract.storage()) as any;
      const tokenStorage = await storage.token_metadata.get(
        data?.wrapped?.tokenId
      );

      const nativeUrl = bytes2Char(tokenStorage!.token_info.get("")!);

      const nativeMeta = await axios(`${setupURI(nativeUrl)}`).catch(() => ({
        data: null,
      }));

      return {
        ...data,
        image: nativeMeta?.data?.displayUri,
        name: nativeMeta?.data?.name,
        description: nativeMeta?.data?.description,
        symbol: nativeMeta?.data?.symbol,
      };
    } catch (e) {
      console.log("in checkEmptyFromTezos");
      return data;
    }
  } else {
    return data;
  }
};

const getMetadata = async (nft: any, account = "", whitelisted = true) => {
  const res = await axios(proxy + setupURI(nft.uri));
  const { data } = res;

  const parsed: NFT = {
    native: nft.native,
    chainId: nft.native.chainId,
    tokenId: nft.native.tokenId,
    contract: nft.native.contract,
    uri: nft.uri,
    owner: account,
    collectionIdent: nft.collectionIdent,
    metaData: {
      whitelisted,
      image: setupURI(data.displayUri || data.image),
      imageFormat: await getAssetFormat(
        setupURI(data.displayUri || data.image)
      ),
      attributes: data?.attributes,
      description: data?.description,
      name: data?.name,
      collectionName: data?.type,
    },
  };
  return parsed;
};

export const tezosParser = async (
  collectionIdent: string,
  nft: any,
  account: string,
  whitelisted: boolean
) => {
  const {
    native: { contract, tokenId, chainId },
    uri,
  } = nft;
  let parsed;
  switch (collectionIdent) {
    case "KT18pPEPFqiP472bWxmxvN1NmMMFZVhojwEA":
      parsed = await TributeTezoTrooperz(nft, account, whitelisted);
      break;
    case "KT18pVpRXKPY2c4U2yFEGSH3ZnhB2kL8kwXS":
      parsed = await Rarible(nft, account, whitelisted);
      break;

    case "KT1RCzrLhBpdKXkyasKGpDTCcdbBTipUk77x":
      parsed = nft.native.meta
        ? await Default(nft, account, whitelisted)
        : await RocketMonsters(nft, account, whitelisted);
      break;

    default:
      parsed = await Default(nft, account, whitelisted);
      break;
  }
  return parsed;
};

export const Default = async (
  nft: any,
  account: string,
  whitelisted: boolean
): Promise<NFT> => {
  if (!nft.native.meta?.token) {
    return await getMetadata(nft, account, whitelisted).catch(() => nft);
  }

  const {
    collectionIdent,
    uri,
    native,
    native: {
      tokenId,
      chainId,
      contract,
      meta: {
        token: {
          metadata: {
            displayUri,
            image,
            description,
            attributes,
            name,
            symbol,
            formats,
          },
        },
      },
    },
  } = nft;

  const mimeType = Array.isArray(formats) ? formats[0].mimeType : formats;
  const format = mimeType?.slice(mimeType.lastIndexOf("/") + 1);
  const parsed: NFT = {
    native,
    chainId,
    tokenId,
    contract,
    uri,
    owner: account,
    collectionIdent,
    metaData: {
      whitelisted,
      image: setupURI(displayUri || image),
      imageFormat: format,
      attributes,
      symbol,
      description,
      name,
    },
  };
  return parsed;
};

export const RocketMonsters = async (
  nft: any,
  account: string,
  whitelisted: boolean
): Promise<NFT> => {
  const {
    collectionIdent,
    uri,
    native,
    native: { tokenId, chainId, contract },
  } = nft;

  const res = await axios(proxy + setupURI(uri));
  const { data } = res;

  const parsed: NFT = {
    native,
    chainId,
    tokenId,
    contract,
    uri: nft.uri,
    owner: account,
    collectionIdent: nft.collectionIdent,
    metaData: {
      whitelisted,
      image: setupURI(data.displayUri),
      imageFormat: "png",
      attributes: data?.attributes,
      description: data?.description,
      name: data?.name,
      collectionName: data?.collectionName,
      symbol: data?.symbol,
    },
  };
  return parsed;
};

// ! "KT18pPEPFqiP472bWxmxvN1NmMMFZVhojwEA"
export const TributeTezoTrooperz = async (
  nft: any,
  account: string,
  whitelisted: boolean
): Promise<NFT> => {
  const {
    collectionIdent,
    uri,
    native,
    native: {
      tokenId,
      chainId,
      contract,
      meta: {
        token: {
          metadata: { description, attributes, formats, image, name, symbol },
        },
      },
    },
  } = nft;
  const mimeType = formats[0].mimeType;
  const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
  const parsed: NFT = {
    native,
    chainId,
    tokenId,
    contract,
    uri,
    owner: account,
    collectionIdent,
    metaData: {
      whitelisted,
      image: setupURI(image),
      imageFormat: format,
      attributes,
      symbol,
      description,
      name,
    },
  };
  return parsed;
};
// ! KT18pVpRXKPY2c4U2yFEGSH3ZnhB2kL8kwXS
export const Rarible = async (
  nft: any,
  account: string,
  whitelisted: boolean
): Promise<NFT> => {
  const {
    collectionIdent,
    uri,
    native,
    native: {
      tokenId,
      chainId,
      contract,
      meta: {
        token: {
          metadata: {
            description,
            attributes,
            displayUri,
            artifactUri,
            name,
            symbol,
          },
        },
      },
    },
  } = nft;
  const parsed: NFT = {
    native,
    chainId,
    tokenId,
    contract,
    uri,
    owner: account,
    collectionIdent,
    metaData: {
      whitelisted,
      image: setupURI(displayUri),
      imageFormat: "gif",
      animation_url: setupURI(artifactUri),
      animation_url_format: "mp4",
      attributes,
      symbol,
      description,
      name,
    },
  };
  return parsed;
};
