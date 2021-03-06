import { stringify } from "querystring";
import BigNumber from "bignumber.js";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { checkEmptyFromTezos } from "./tezos";
import requestPool from "../../tools/requestPool";
import { getWrappedNft } from "../../tools/helpers";

const pool = requestPool(3000);
const cheerio = require("cherio");

export const proxy = "https://sheltered-crag-76748.herokuapp.com/";
export interface NFT {
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
    collectionName?: string;
  };
}

export const setupURI = (uri: string): string => {
  if (uri) {
    if (uri.includes("https://ipfs.io")) {
      return uri;
    } else if (/^ipfs:\/\//.test(uri)) {
      return "https://ipfs.io/ipfs/" + uri.split("://")[1];
    } else if (/^https\:\/\/ipfs.io/.test(uri)) {
      return uri;
    } else if (
      uri.includes("data:image/") ||
      uri.includes("data:application/")
    ) {
      return uri;
    } else if (uri[0] === "Q") {
      return `https://ipfs.io/ipfs/${uri}`;
    } else {
      return uri.replace("http://", "https://");
    }
  } else {
    return uri;
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
  const baseUrl = setupURI(uri);

  if (!baseUrl && tokenId) {
    return await getWrappedNft(nft, account, whitelisted);
  }

  const url = `${proxy}${setupURI(baseUrl)}`;
  try {
    const response = await axios(url);
    const { data } = response;

    let format;

    if (/(\.png$|\.jpe?g$)/.test(data.image)) {
      format = data.image.match(/(?:\.([^.]+))?$/)[1];
    } else {
      const { headers } = await axios(`${proxy}${setupURI(data.image)}`);

      format = headers["content-type"].slice(
        headers["content-type"].lastIndexOf("/") + 1
      );
    }

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
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

// ! 0x0271c6853d4b2bdccd53aaf9edb66993e14d4cba
// ! 0x4508af04de4073b10a53ac416eb311f4a2ab9569
export const ART_NFT_MATIC = async (
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
    const { headers } = await axios(`${proxy}${data.image}`);
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
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: data.image,
        imageFormat: format,
        attributes: data.attributes,
        name: data.name,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! 0xa8a079ea48dc846899bdb542f3728dbc6758fdfa
export const EtherHead = async (
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
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: data.image,
        imageFormat: "png",
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
// ! 0x6e1ecc59f4005d0f2707ab7a0a8cecbaba41c11e
export const AngelOfAether = async (
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
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: data.image,
        imageFormat: "jpg",
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
// ! 0xe5b3903ffb3a00e91c75e25a4bd6616d3171e45e
export const Legend = async (
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
    const { headers } = await axios(`${proxy}${setupURI(data.image)}`);
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
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: format,
        attributes: data.attributes,
        name: data.name,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! 0xee6d7e31ea2095df9b2f89ec15111d3de5cd39af
// ! AlphaBettyDoodle
export const AlphaBettyDoodle = async (
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
    const { headers } = await axios(`${proxy}${setupURI(data.image)}`);
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
      wrapped: data && data.wrapped,
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

export const Mabstronauts = async (
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
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      collectionIdent,
      owner: account,
      uri,
      contract,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: `https://ipfs.io/ipfs/${data.image}`,
        imageFormat: "png",
        name: data.name,
        symbol: data.symbol,
        description: data.description,
        contractType: "erc1155",
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};

// ! 0x0D41c70E20587c2ec1cea9c4A3d394eC63C4bfbe
export const RocketMonsters = async (
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
    const { headers } = await axios(`${proxy}${setupURI(data.image)}`);
    const format = headers["content-type"].slice(
      headers["content-type"].lastIndexOf("/") + 1
    );
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      collectionIdent,
      owner: account,
      uri,
      contract,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: format,
        name: data.name,
        description: data.direction,
        attributes: data.attributes,
        contractType: "erc721",
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! 0xDcAA2b071c1851D8Da43f85a34a5A57d4Fa93A1A
export const TheBlackMagic = async (
  nft: any,
  account: string,
  whitelisted: boolean
): Promise<NFT> => {
  // debugger;
  const {
    native,
    native: { contract, tokenId, chainId },
    collectionIdent,
    uri,
  } = nft;
  const baseUrl = uri;
  const url = `${proxy}${setupURI(uri)}`;
  const imageFormats = ["gif", "jpg", "jpeg", "png", "svg", "webp"];
  let nestedImage;
  try {
    const response = await axios(url);
    let { data } = response;
    data = await checkEmptyFromTezos(data);

    const imgResp = await axios(setupURI(data.image));
    const headers = imgResp.headers["content-type"];
    let formats;
    let mimeType;
    let format;
    if (headers.slice(headers.lastIndexOf("/") + 1) === "json") {
      nestedImage = true;
    } else if (
      imageFormats.some(
        (f) => f === headers.slice(headers.lastIndexOf("/") + 1)
      )
    ) {
      nestedImage = false;
    }
    if (nestedImage) {
      formats = imgResp.data.formats;
      mimeType = imgResp.data.formats[0].mimeType;
    } else {
      format = headers.slice(headers.lastIndexOf("/") + 1);
    }
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      collectionIdent,
      owner: account,
      uri,
      contract,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: nestedImage
          ? setupURI(imgResp.data.formats[0].uri)
          : setupURI(data.image),
        imageFormat: nestedImage
          ? mimeType.slice(mimeType.lastIndexOf("/") + 1)
          : format,
        name: imgResp.data.name || data.name,
        description: imgResp.data.description || data.description,
        symbol: imgResp.data.symbol || data.symbols,
        attributes: data.attributes || imgResp.data.attributes,
        contractType: "erc721",
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! 0x4c1900270dbf0c1e6a9c984aef9a18a7cb9ab1cc
export const CartelPunks = async (
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
    const imgResp = await axios(setupURI(data.image));
    const mimeType = imgResp.headers["content-type"];
    const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      collectionIdent,
      owner: account,
      uri,
      contract,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: format,
        name: data.name,
        attributes: data.attributes,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! 0x36f8f51f65fe200311f709b797baf4e193dd0b0d
export const TreatNFT = async (
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
  const newUrl = `${proxy}https://treatdao.com/api/nft/${tokenId}`;
  try {
    const response = await axios(newUrl);
    const { data } = response;
    const imgResp = await axios(setupURI(data.image));
    const mimeType = imgResp.headers["content-type"];
    const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      collectionIdent,
      owner: account,
      uri: newUrl,
      contract,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: data.image,
        imageFormat: format,
        name: data.name,
        attributes: data.attributes,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! 0x2c83eaf6e460c673d92477a7c49eb4ecd04e1216
export const IdoDirt = async (
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
  const newUrl = `${proxy}https://treatdao.com/api/nft/${tokenId}`;
  try {
    const response = await axios(newUrl);
    const { data } = response;
    const imgResp = await axios(setupURI(data.image));
    const mimeType = imgResp.headers["content-type"];
    const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      collectionIdent,
      owner: account,
      uri: newUrl,
      contract,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: data.image,
        imageFormat: format,
        name: data.name,
        attributes: data.attributes,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! 0x691bd0f2f5a145fcf297cf4be79095b66f002cbc
export const Awokensages = async (
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
  const newUri = `https://api.crosspunks.com/cars/meta/2/${tokenId}`;
  const baseUrl = uri;
  try {
    const response = await axios(newUri);
    const { data } = response;
    const imgResp = await axios(setupURI(data.image));
    const mimeType = imgResp.headers["content-type"];
    const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      collectionIdent,
      owner: account,
      uri: newUri,
      contract,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: format,
        name: data.name,
        attributes: data.attributes,
        description: data.description,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! 0x7f3495cf2d05db6e9e52cdf989bced71e786725c
export const Technomaniacs = async (
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
  const newUri = `https://api.crosspunks.com/cars/meta/1/${tokenId}`;
  const baseUrl = uri;
  try {
    const response = await axios(newUri);
    const { data } = response;
    const imgResp = await axios(setupURI(data.image));
    const mimeType = imgResp.headers["content-type"];
    const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      collectionIdent,
      owner: account,
      uri: newUri,
      contract,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: format,
        name: data.name,
        attributes: data.attributes,
        description: data.description,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! 0xe7f8ccda432239dcb418e94d625bc2fe6350f6bb
export const ArcadeEdition = async (
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
  const newUri = `https://api.alturanft.com/meta/arcade-edition/${tokenId}`;
  try {
    const response = await axios(newUri);
    const { data } = response;
    const mimeType = data.mime;
    const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      collectionIdent,
      owner: account,
      uri: newUri,
      contract,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: format,
        name: data.name,
        description: data.description,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! 0x56d93767467c54bd86578666904087c4f16cdb7f
export const Founders_Cabinet = async (
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
  const newUri = `https://api.alturanft.com/meta/chain-cade-founders-edition/${tokenId}`;
  const baseUrl = uri;
  try {
    const response = await axios(newUri);
    const { data } = response;
    const mimeType = data.mime;
    const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      collectionIdent,
      owner: account,
      uri: newUri,
      contract,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: format,
        name: data.name,
        description: data.name,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! 0x2d317ed6c2e3eb5c54ca7518ef19deee96c15c85
export const TTAV = async (
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
    const { data } = await axios(url);
    const { headers } = await axios(setupURI(data.image));
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
      wrapped: data && data.wrapped,
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
// ! 0x7a7ca3b27760b52428d7a9d0a9f369ff31a2de94
export const BoredGUtterCats = async (
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
  const newUri = `https://ipfs.moralis.io:2053/ipfs/QmV4CkNpDsiF5hSaUCJZAndDo1gVM8zxTKMbpN8teyDoTv/${tokenId}.json`;
  try {
    const { data } = await axios(newUri);
    const { headers } = await axios(setupURI(data.image));
    const format = headers["content-type"].slice(
      headers["content-type"].lastIndexOf("/") + 1
    );
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      collectionIdent,
      owner: account,
      uri: newUri,
      contract,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: format,
        name: data.name,
        description: data.description,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! 0x2FeEE2Cc7fB32bD48AB22080e2C680f5390Ef426
export const IDoDirtPolygon = async (
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
    const { data } = await axios(url);
    const { headers } = await axios(setupURI(data.image));
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
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: format,
        attributes: data.attributes,
        description: data.description,
        name: data.name,
        contractType: "erc721",
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! 0x2953399124f0cbb46d2cbacd8a89cf0599974963
export const ArsenalGame = async (
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
  if (!uri)
    console.log(
      "NFT with no uri collection: ",
      collectionIdent,
      "tokenId: ",
      tokenId
    );
  const url = `${proxy}${setupURI(uri)}`;
  try {
    const { data } = await axios(url);
    const { headers } = await axios(setupURI(data.image));
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
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: format,
        animation_url: data.animation_url,
        animation_url_format: "mp4",
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
// ! 0xc69ecd37122a9b5fd7e62bc229d478bb83063c9d
export const Mate = async (
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
    const { data } = await axios(url);
    const imgResp = await axios(setupURI(data.image));
    const mimeType = imgResp?.headers?.["content-type"];
    const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.animation_url),
        imageFormat: format,
        attributes: data.attributes,
        description: data.description,
        name: data.name,
        symbol: imgResp.data.symbol,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);
    return nft;
  }
};
// ! 0x8eaeaa3a67abfc7c141775234fc30c707e26cf49
// ! ABCBears
export const ABCBears = async (
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
  if (!uri)
    console.log(
      "NFT with no uri collection: ",
      collectionIdent,
      "tokenId: ",
      tokenId
    );
  const url = `${proxy}${setupURI(uri)}`;
  try {
    const { data } = await axios(url);
    const { headers } = await axios(setupURI(data.image));
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
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: format,
        animation_url: data.animation_url,
        animation_url_format: "mp4",
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
// ! 0x51ecb52ebb85384679b108a9e6a017ae17754eef
// ! Tragic Monsters
export const TragicMonsters = async (
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
  if (!uri)
    console.log(
      "NFT with no uri collection: ",
      collectionIdent,
      "tokenId: ",
      tokenId
    );
  const url = `${proxy}${setupURI(uri)}`;
  try {
    const { data } = await axios(url);
    const { headers } = await axios(setupURI(data.image));
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
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: format,
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
// ! 0xbede8ad4878e5ce441accce6a828ea7bc5be1ed0
// ! Super Fat Academy NFT
export const SuperFatAcademy = async (
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
  if (!uri)
    console.log(
      "NFT with no uri collection: ",
      collectionIdent,
      "tokenId: ",
      tokenId
    );
  const url = `${proxy}${setupURI(uri)}`;
  try {
    const { data } = await axios(url);
    const { headers } = await axios(setupURI(data.image));
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
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: format,
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

// ! 0xb94c3fd0016888bab09dbc229f9397294e828a54
// ! Forgotten Runes Comic
export const ForgottenRunesComic = async (
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
    const { headers } = await axios(`${proxy}${setupURI(data.image)}`);
    const video = headers["content-type"].includes("video");
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
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: "",
        imageFormat: "",
        animation_url: setupURI(data.image),
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
// ! 0xd4c77e46b0266a7aca11083bcc86342f47bbdd04
// ! LilDickie
export const LilDickie = async (
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
    const { headers } = await axios(`${proxy}${setupURI(data.image)}`);
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
      wrapped: data && data.wrapped,
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
// ! 0x9304f22a5ab577119210d730e41755a6732e19f7
// ! TheCheeks
export const TheCheeks = async (
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
    const { headers } = await axios(`${proxy}${setupURI(data.image)}`);
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
      wrapped: data && data.wrapped,
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
// ! 0x028faf7eab0d8abb4a2d784206bfa98979041ffc
// ! Interesting CPeople
export const InterestingCPeople = async (
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
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: "png",
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

export const Nagato = async (
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
    const response = (await pool.addRequest(url)) as AxiosResponse<any, any>;

    const { data } = response;
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: data
          ? setupURI(data.image)
          : `https://ipfs-nft-storage.com/ipfs/velasnagato/${tokenId}.png`,
        imageFormat: "png",
        attributes: data && data.attributes,
        description: data && data.description,
        name: data ? data.name : `Nagato #${tokenId}`,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};

export const OpenSEA = async (
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
    const response = await axios(`${proxy}${uri.replace("0x{id}", tokenId)}`);

    const { data } = response;
    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: data.image,
        imageFormat: "png",
        attributes: data && data.attributes,
        description: data && data.description,
        animation_url: data.animation_url,
        name: data.name,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};

export const ChainCaders = async (
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
    const response = await axios(
      `${proxy}https://api.alturanft.com/api/item/56/${collectionIdent}/${tokenId}`
    );

    const { data } = response;

    console.log(data);

    const nft: NFT = {
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
        image: data?.item?.imageUrl,
        imageFormat: data?.item?.imageUrl?.match(/(?:\.([^.]+))?$/)[1],
        name: data?.item?.name,
        description: data?.item?.description,
        collectionName: data?.item?.collectionName,
        attributes: data?.item?.properties,
        contractType: "1155",
      },
    };

    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};

export const OPENSTORE = async (
  nft: any,
  account: string,
  whitelisted: boolean
) => {
  const {
    native,
    native: { contract, tokenId, chainId, contractType },
    collectionIdent,
    uri,
  } = nft;

  try {
    const response = await axios(
      contractType === "ERC1155"
        ? `${proxy}https://api.opensea.io/api/v2/metadata/matic/0x2953399124F0cBB46d2CbACD8A89cF0599974963/${tokenId}`
        : `${proxy}${uri.replace(/:\d+/, "").replace(".moralis", "")}`
    );

    const { data } = response;

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: data && setupURI(data.image_url || data.image),
        imageFormat: "png",
        description: data && data.description,
        animation_url: data && data.animation_url,
        name: data && data.name,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};

export const COZYCOSM = async (
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
    const res = await axios(setupURI(uri));

    const { data } = res;

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: "png",
        name: data.name,
        description: data.description,
        attributes: data.attributes,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};

export const MachineFi = async (
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
    const data = JSON.parse(uri);

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: data && data.image,
        imageFormat: "gif",
        description: data && data.description,
        name: data && data.name,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};

export const TRSRNFT = async (
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
    const { data } = await axios(`${proxy}${uri}`).catch(() => ({
      data: null,
    }));

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: data && data.data?.image,
        imageFormat: "png",
        description: data && data.data?.description,
        name: data && data.data?.name,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};

//WUBI

export const WUBI = async (nft: any, account: string, whitelisted: boolean) => {
  const {
    native,
    native: { contract, tokenId, chainId },
    collectionIdent,
    uri,
  } = nft;

  try {
    const response = (await pool.addRequest(`${uri}`)) as AxiosResponse<
      any,
      any
    >;

    const { data } = response;

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: data && setupURI(data?.image),
        imageFormat: "png",
        description: data && data?.description,
        name: data && data?.name,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};

export const PACK = async (nft: any, account: string, whitelisted: boolean) => {
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

    const { data } = response;

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: "png",
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

export const VelasOgPunks = async (
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
    const response = await fetch(uri);

    const data = await response.json();

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: setupURI(data.image),
        imageFormat: "png",
        description: data.description,
        name: data.name,
        symbol: data.symbol || "PUNK",
        attributes: data.attributes,
        contractType: data.type || "721",
        collectionName: "VelasOGPunks",
      },
    };
    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};

export const Cities = async (
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
    const response = (await pool.addRequest(proxy + uri)) as AxiosResponse<
      any,
      any
    >; // await fetch(proxy + uri);

    const { data } = response;

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data.wrapped,
      metaData: {
        whitelisted,
        image: data && setupURI(data.image),
        imageFormat: "png",
        description: data && data.description,
        name: data && data.name,
        symbol: (data && data.symbol) || "CFOD",
        attributes: data && data.attributes,
        contractType: (data && data.type) || "721",
        collectionName: "Cities From Our Dreams",
      },
    };
    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};

export const Mountains = Cities;

export const WrappedXPNET = async (
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
    let { data } = await axios(`${proxy}${uri}`).catch(() => ({
      data: null,
    }));

    data = await checkEmptyFromTezos(data);

    const nft: NFT = {
      native,
      chainId,
      tokenId,
      owner: account,
      uri,
      contract,
      collectionIdent,
      wrapped: data && data && data.wrapped,
      metaData: {
        whitelisted,
        image: data && setupURI(data.image),
        imageFormat: "png",
        description: data && data?.description,
        name: data && data?.name,
        attributes: data && data?.attributes,
      },
    };
    return nft;
  } catch (error) {
    console.error(error);

    return nft;
  }
};

//"{"name": "MachineFi NFT", "description": "The MachineFi NFT.", "image": "https://machinefi.com/nft/image/6505"}"
