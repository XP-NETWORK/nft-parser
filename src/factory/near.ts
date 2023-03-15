import * as evm from './index'

import { NFT } from './index';

export const nearParser = async (
  collectionIdent: string,
  nft: any,
  account: string,
  whitelisted: boolean,
  chainId?: string
) => {
  let parsed:NFT;
  switch (collectionIdent) {
    default: {
    
      if (nft.uri) {
        parsed = await evm.Default(nft, account, whitelisted);
      } else {
      
      parsed = {
        ...nft,
        metaData: {
            name: nft.title,
            description: nft.description,
            image: nft.image,
            imageFormat: nft.image?.match(/(?:\.([^.]+))?$/)?.at(1) || "",
            collectionName: nft.collectionIdent,
            attributes: nft.attributes
        }
         
      };
    }
      break;
    }
  }

  return parsed;
};
