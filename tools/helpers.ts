import axios from "axios";

import { setupURI } from "../src/factory";

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
