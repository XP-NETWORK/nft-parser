import axios from "axios";
import { getAssetFormat, nftGeneralParser } from "..";
import { setupURI } from ".";

interface NFT {
  chainId: string;
  tokenId: string;
  owner: string;
  uri: string;
  contract?: string;
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
    collectionName?: string;
  };
}
import { proxy } from "..";

export const algorandParser = async (
  collectionIdent: string,
  nft: any,
  account: any,
  whitelisted: boolean
) => {
  switch (true) {
    case collectionIdent.includes("D00dles"):
      collectionIdent = "D00dles";
      break;
    case collectionIdent.includes("Donkey"):
      collectionIdent = "Donkey";
      break;
    case collectionIdent.includes("Algo Rocket"):
      collectionIdent = "Algo Rocket";
      break;
    case collectionIdent.includes("ALGO WEIRD AXEL"):
      collectionIdent = "ALGO WEIRD AXEL";
      break;
    case collectionIdent.includes("Warrior Croc"):
      collectionIdent = "Warrior Croc";
      break;
    case collectionIdent.includes("Al Goanna"):
      collectionIdent = "Al Goanna";
      break;
    case collectionIdent.includes("BrontosEYE"):
      collectionIdent = "BrontosEYE";
      break;
    case collectionIdent.includes("Shep"):
      collectionIdent = "Shep";
      break;
    case collectionIdent.includes("RaptorEYE"):
      collectionIdent = "RaptorEYE";
      break;
    case collectionIdent.includes("The Psychedelic Forest"):
      collectionIdent = "The Psychedelic Forest";
      break;
    case collectionIdent.includes("Dead Putin Society"):
      collectionIdent = "Dead Putin Society";
      break;
    case collectionIdent.includes("AlgoSeas Pirate"):
      collectionIdent = "AlgoSeas Pirate";
      break;
    case collectionIdent.includes("Alchemon"):
      collectionIdent = "Alchemon";
      break;
    case collectionIdent.includes("SMC"):
      collectionIdent = "SMC";
      break;
    case collectionIdent.includes("C.B.C.G"):
      collectionIdent = "C.B.C.G";
      break;
    //C.B.C.G
    default:
      break;
  }
  let parsed;
  switch (collectionIdent) {
    case "D00dles":
      parsed = await LikeD00dles(nft, account, whitelisted);
      break;
    case "Donkey":
      parsed = await LikeD00dles(nft, account, whitelisted);
      break;
    case "Algo Rocket":
      parsed = await LikeD00dles(nft, account, whitelisted);
      break;
    case "ALGO WEIRD AXEL":
      parsed = await LikeD00dles(nft, account, whitelisted);
      break;
    case "Warrior Croc":
      parsed = await WarriorCroc(nft, account, whitelisted);
      break;
    case "Al Goanna":
      parsed = await LikeD00dles(nft, account, whitelisted);
      break;
    case "BrontosEYE":
      parsed = await LikeD00dles(nft, account, whitelisted);
      break;
    case "Number 512":
      parsed = await LikeD00dles(nft, account, whitelisted);
      break;
    case "Shep":
      parsed = await LikeD00dles(nft, account, whitelisted);
      break;
    case "The Psychedelic Forest":
      parsed = await LikeD00dles(nft, account, whitelisted);
      break;
    case "RaptorEYE":
      parsed = await LikeD00dles(nft, account, whitelisted);
      break;
    case "Dead Putin Society":
      parsed = await LikeD00dles(nft, account, whitelisted);
      break;
    case "LION'S BEAUTY":
      parsed = await LikeD00dles(nft, account, whitelisted);
      break;
    case "Floating ghost":
      parsed = await LikeD00dles(nft, account, whitelisted);
      break;
    case "AlgoSeas Pirate":
      parsed = await LikeD00dles(nft, account, whitelisted);
      break;
    case "Alchemon":
      parsed = await Alchemon(nft, account, whitelisted);
      break;
    case "SMC":
      parsed = await SMC(nft, account, whitelisted);
      break;
    case "C.B.C.G":
      parsed = await CBCG(nft, account, whitelisted);
      break;

    case "Bozeman Mountaineers JMFL":
      parsed = await Bozeman(nft, account, whitelisted);
      break;

    default:
      parsed = await Default(nft, account, whitelisted);
      break;
  }
  return parsed;
};
// ! COLLECTIONS
// ! Default
export const Default = async (
  nft: any,
  account: string,
  whitelisted: boolean
): Promise<NFT> => {
  const {
    native,
    native: { contract, tokenId, chainId, name },
    collectionIdent,
    uri,
  } = nft;

  try {
    const [json, foramt] = await Promise.all([
      axios(proxy + `https://api.algoxnft.com/v1/assets/${tokenId}`),
      getAssetFormat(setupURI(uri)),
    ]);

    const { data } = json;

    return {
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
        image: setupURI(uri),
        imageFormat: foramt,
        name: data?.name || name,
        collectionName: data?.collection_name || name.split("#")[0].trim(),
        attributes: data?.arc69_data?.attributes,
        description: data?.collection_description
      },
    };
  } catch (error: any) {
    return {
      ...nft,
      ...(error.response?.status === 404 ? { errorStatus: 404 } : {}),
    };
  }
};
// ! "D00dles"
export const LikeD00dles = async (
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
  const url = `${proxy}${setupURI(uri)}`;
  try {
    const response = await axios(url);
    const { data, headers } = response;
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
      wrapped: data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(url),
        imageFormat: format,
        attributes: data.attributes,
        description: data.description,
        name: data.name,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! Warrior Croc
export const WarriorCroc = async (
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
  // debugger;
  const url = `${proxy}${setupURI(uri)}`;
  try {
    const response = await axios(url);
    const { data } = response;
    const format = data["image_mime_type"].slice(
      data["image_mime_type"].lastIndexOf("/") + 1
    );
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
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! Alchemon
export const Alchemon = async (
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
    const { data, headers } = response;
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
      wrapped: data.wrapped,
      metaData: {
        whitelisted,
        image: "",
        imageFormat: "",
        animation_url: setupURI(uri),
        animation_url_format: format,
        attributes: data.attributes,
        description: data.description,
        name: data.name,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};

export const SMC = async (
  nft: any,
  account: string,
  whitelisted: boolean
): Promise<NFT> => {
  const {
    native,
    native: { contract, tokenId, chainId, name },
    collectionIdent,
    uri,
  } = nft;

  const [attrs, foramt] = await Promise.all([
    axios(proxy + `https://api.algoxnft.com/v1/assets/${tokenId}/arc69`),
    getAssetFormat(setupURI(uri)),
  ]);

  const { data } = attrs;

  try {
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
        image: setupURI(uri),
        imageFormat: foramt,
        name,
        symbol: "SMC",
        collectionName: "SMC",
        attributes: data?.attributes,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};

export const CBCG = async (
  nft: any,
  account: string,
  whitelisted: boolean
): Promise<NFT> => {
  const {
    native,
    native: { contract, tokenId, chainId, name },
    collectionIdent,
    uri,
  } = nft;

  /* const attrs = await axios(
    proxy + `https://api.algoxnft.com/v1/assets/${tokenId}/arc69`
  );*/

  const [attrs, foramt] = await Promise.all([
    axios(proxy + `https://api.algoxnft.com/v1/assets/${tokenId}/arc69`),
    getAssetFormat(setupURI(uri)),
  ]);

  const { data } = attrs;

  try {
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
        image: setupURI(uri),
        imageFormat: foramt,
        name,
        symbol: "C.B.C.G",
        collectionName: "C.B.C.G",
        attributes: data?.attributes,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};

export const Bozeman = async (
  nft: any,
  account: string,
  whitelisted: boolean
): Promise<NFT> => {
  const {
    native,
    native: { contract, tokenId, chainId, name },
    collectionIdent,
    uri,
  } = nft;

  /* const attrs = await axios(
    proxy + `https://api.algoxnft.com/v1/assets/${tokenId}/arc69`
  );*/

  const [attrs, foramt] = await Promise.all([
    axios(proxy + `https://api.algoxnft.com/v1/assets/${tokenId}/arc69`),
    getAssetFormat(setupURI(uri)),
  ]);

  const { data } = attrs;

  try {
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
        image: setupURI(uri),
        imageFormat: foramt,
        name,
        //symbol: "Bozeman Mountaineers JMFL",
        collectionName: "Bozeman Mountaineers JMFL",
        attributes: data?.attributes,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
