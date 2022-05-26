type NFT = {
    contract: string;
    tokenId: string;
    chainId: string;
};

const nftparse = async (nft: NFT) => {
    // TODO parse nft object and return JSON
    const parsedJSON: any = "some json";
    return parsedJSON;
};

module.exports = nftparse;
