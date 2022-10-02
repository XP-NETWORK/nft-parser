import { UserNftMinter__factory } from "xpnet-web3-contracts";
import { Base64 } from "js-base64";

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
        let uri: string | Array<string> = await erc.tokenURI(nft.native?.tokenId)

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
