import { UserNftMinter__factory } from "xpnet-web3-contracts";

class EvmContract {
  providers: any = {};
  chainPrams: any;

  async getUri(nft: any, collectionIdent: string) {
    try {
      if (this.chainPrams && nft.native?.chainId && nft.native?.tokenId) {
        const provider = this.providers[nft.native.chainId] ? this.providers[nft.native.chainId]
          : await (await this.chainPrams.inner(+nft.native.chainId)).getProvider();

        this.providers[nft.native.chainId] = provider;
        const erc = UserNftMinter__factory.connect(collectionIdent, provider);
        const resp = await erc.tokenURI(nft.native?.tokenId)

        let uri
        console.log(resp);
        // switch (resp) {
        //   case value:

        //     break;

        //   default:
        //     break;
        // }

        return {
          ...nft,
          uri,
        };
      }
    } catch (e: any) {
      console.log(e.message);
      return nft;
    }
  }

  public init(chainPrams: any) {
    if (!this.chainPrams && chainPrams) this.chainPrams = chainPrams;
  }
}

export default () => new EvmContract();
