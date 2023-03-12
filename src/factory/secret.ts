export const secretParser = async (
  collectionIdent: string,
  nft: any,
  account: string,
  whitelisted: boolean,
  chainId?: string
) => {
  let parsed;
  switch (collectionIdent) {
    default: {
      parsed = {
        ...nft,
        metaData:
          Object.keys(nft?.metaData)?.length === 0
            ? {
                ...nft.native?.metadata,
                image: nft.native?.metadata?.media?.at(0)?.url,
              }
            : nft.metaData,
      };
      break;
    }
  }

  return parsed;
};
