"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = exports.SpaceClub = exports.tronParser = void 0;
const axios_1 = __importDefault(require("axios"));
const requestPool_1 = __importDefault(require("../../tools/requestPool"));
const _1 = require(".");
const helpers_1 = require("../../tools/helpers");
const __1 = require("..");
const pool = (0, requestPool_1.default)(3000);
const tronParser = (collectionIdent, nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    switch (collectionIdent) {
        case "TGkgcveyPzhzj18dtxpzaAtcL5ZUB8965A": {
            parsed = yield (0, exports.SpaceClub)(nft, account, whitelisted);
            break;
        }
        default:
            parsed = yield (0, exports.Default)(nft, account, whitelisted);
            break;
    }
    return parsed;
});
exports.tronParser = tronParser;
const SpaceClub = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const query = {
        operationName: "assetsDetail",
        variables: {
            blockChain: {
                chain: "tron",
                chainId: "0x2b6653dc",
            },
            contractAddress: "TGkgcveyPzhzj18dtxpzaAtcL5ZUB8965A",
            tokenId: String(tokenId),
        },
        query: "query assetsDetail($blockChain: BlockChainInput!, $contractAddress: Address!, $tokenId: String!, $thirdStandards: [String!]) {\n  asset(\n    identity: {blockChain: $blockChain, contractAddress: $contractAddress, tokenId: $tokenId}\n  ) {\n    id\n    chain\n    chainId\n    contractAddress\n    tokenId\n    tokenType\n    creatorAddress\n    collectionId\n    name\n    description\n    imageUrl\n    imagePreviewUrl\n    imageThumbnailUrl\n    animationUrl\n    externalUrls\n    unlockContentEnable\n    ownedQuantity\n    ownershipCount\n    quantity\n    properties {\n      key\n      value\n      traitCount\n      traitTotal\n      traitSupply\n      __typename\n    }\n    levels {\n      key\n      value\n      max\n      __typename\n    }\n    stats {\n      key\n      value\n      max\n      __typename\n    }\n    supply\n    tradeSummary(thirdStandards: $thirdStandards) {\n      lastSale {\n        lastSalePrice\n        lastSaleTokenContract {\n          id\n          name\n          address\n          icon\n          decimal\n          symbol\n          accuracy\n          __typename\n        }\n        __typename\n      }\n      bestBid {\n        bestBidPrice\n        bestBidToken\n        bestBidPriceBase\n        bestBidPriceUSD\n        bestBidPriceCNY\n        bestBidCreatedDate\n        bestBidOrderString\n        bestBidOrderQuantity\n        bestBidTokenContract {\n          id\n          name\n          address\n          icon\n          decimal\n          symbol\n          accuracy\n          __typename\n        }\n        __typename\n      }\n      bestAsk {\n        bestAskSaleKind\n        bestAskPrice\n        bestAskToken\n        bestAskPriceBase\n        bestAskPriceUSD\n        bestAskExpirationDate\n        bestAskOrderString\n        bestAskOrderType\n        bestAskOrderQuantity\n        bestAskTokenContract {\n          id\n          name\n          address\n          icon\n          decimal\n          symbol\n          accuracy\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    assetOwners(first: 1) {\n      edges {\n        cursor\n        node {\n          chain\n          chainId\n          owner\n          balance\n          account {\n            identity {\n              address\n              blockChain {\n                chain\n                chainId\n                __typename\n              }\n              __typename\n            }\n            user {\n              id\n              address\n              profileImageUrl\n              userName\n              __typename\n            }\n            info {\n              profileImageUrl\n              userName\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    creator {\n      identity {\n        address\n        blockChain {\n          chain\n          chainId\n          __typename\n        }\n        __typename\n      }\n      user {\n        id\n        address\n        profileImageUrl\n        userName\n        __typename\n      }\n      info {\n        profileImageUrl\n        userName\n        __typename\n      }\n      __typename\n    }\n    paymentTokens {\n      id\n      name\n      address\n      icon\n      symbol\n      chain\n      chainId\n      decimal\n      __typename\n    }\n    collection {\n      id\n      name\n      slug\n      description\n      imageUrl\n      bannerImageUrl\n      featuredImageUrl\n      externalUrl\n      weiboUrl\n      twitterUrl\n      instagramUrl\n      mediumUrl\n      telegramUrl\n      discordUrl\n      facebookUrl\n      paymentTokens {\n        id\n        name\n        icon\n        symbol\n        chain\n        chainId\n        decimal\n        address\n        __typename\n      }\n      isVerified\n      royalty\n      royaltyAddress\n      __typename\n    }\n    uri\n    isFavorite\n    favoriteQuantity\n    __typename\n  }\n}\n",
    };
    try {
        const res = yield axios_1.default.post(__1.proxy + "https://api.apenft.io/graphql", query, {
            headers: {
                "x-api-key": __1.apenftKey,
                "x-api-sign": __1.apenftSign,
            },
        });
        const asset = (_b = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.asset;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: null,
            metaData: {
                whitelisted,
                image: asset === null || asset === void 0 ? void 0 : asset.imageUrl,
                imageFormat: (_d = (_c = asset === null || asset === void 0 ? void 0 : asset.imageUrl) === null || _c === void 0 ? void 0 : _c.match(/(?:\.([^.]+))?$/)) === null || _d === void 0 ? void 0 : _d.at(1),
                attributes: asset === null || asset === void 0 ? void 0 : asset.properties,
                description: asset.description,
                name: asset.name,
                contractType: asset.tokenType,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error.code || error.status);
        return nft;
    }
});
exports.SpaceClub = SpaceClub;
const Default = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${__1.proxy}${(0, _1.setupURI)(uri)}`;
    try {
        const response = yield (0, axios_1.default)(url);
        const { data } = response;
        const format = yield (0, helpers_1.getAssetFormat)(data.image);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data.wrapped,
            metaData: {
                whitelisted,
                image: (0, _1.setupURI)(data.image),
                imageFormat: format,
                attributes: data.attributes,
                description: data.description,
                name: data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign({}, nft), (((_e = error.response) === null || _e === void 0 ? void 0 : _e.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
exports.Default = Default;
