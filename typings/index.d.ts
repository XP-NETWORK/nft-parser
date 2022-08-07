declare module nftParser {
  export function nftGeneralParser(
    nft: any,
    account: string,
    whitelisted: boolean,
    factory?: any
  ): Promise<ParsedNFT>;
}
