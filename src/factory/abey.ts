import { Default } from ".";

export const abeyParser = async (
  collectionIdent: string,
  nft: any,
  account: string,
  whitelisted: boolean,
  chainId?: string
) => {
  let parsed;

  if (/^0x/.test(nft.uri)) {
    nft = {
      ...nft,
      uri: `https://metadata.fantase.io/${nft.uri}`,
    };
  }

  console.log(nft, "nft");

  switch (true) {
    default:
      parsed = Default(nft, account, whitelisted);
  }
  return parsed;
};
