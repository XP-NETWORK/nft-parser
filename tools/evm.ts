import { UserNftMinter__factory } from "xpnet-web3-contracts";

class EvmContract {
  providers: any = {};
  chainPrams: any;

  async getUri(nft: any, collectionIdent: string) {
  
    
    if (this.chainPrams && nft.native?.chainId && nft.native?.tokenId) {
      console.log("GOT HERE_____________________");
      try {
        const provider = this.providers[nft.native.chainId]
          ? this.providers[nft.native.chainId]
          : await (
              await this.chainPrams.inner(+nft.native.chainId)
            ).getProvider();

        this.providers[nft.native.chainId] = provider;

        const erc = UserNftMinter__factory.connect(collectionIdent, provider);

        const uri = await erc.tokenURI(nft.native?.tokenId).catch((e) => {
          console.log(e);
          return nft.uri;
        });

        return {
          ...nft,
          uri,
        };
      } catch (e) {
        console.log(e);
      }
    }
  }

  public init(chainPrams: any) {
    if (!this.chainPrams && chainPrams) this.chainPrams = chainPrams;
  }
}

export default () => new EvmContract();
