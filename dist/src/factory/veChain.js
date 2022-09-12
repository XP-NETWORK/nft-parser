"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.veChainParser = void 0;
const axios_1 = __importDefault(require("axios"));
const requestPool_1 = __importDefault(require("../../tools/requestPool"));
const _1 = require(".");
const evm = __importStar(require("./index"));
const tezos_1 = require("./tezos");
const __1 = require("..");
const pool = (0, requestPool_1.default)(3000);
const cheerio = require("cherio");
const veChainParser = (collectionIdent, nft, account, whitelisted, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    switch (true) {
        case /0x5E6265680087520DC022d75f4C45F9CCD712BA97/.test(collectionIdent):
            parsed = yield WOVY(nft, account, whitelisted);
            break;
        case /0xf0E778BD5C4c2F219A2A5699e3AfD2D82D50E271/.test(collectionIdent):
            parsed = yield WrappedXPNET(nft, account, whitelisted);
            break;
        case /0x2FD3d1E1a3F1E072c89d67301a86a5ba850Ccd4E/.test(collectionIdent):
            parsed = yield Anon(nft, account, whitelisted);
            break;
        case /0x3473c5282057D7BeDA96C1ce0FE708e890764009/.test(collectionIdent):
            parsed = yield Planet(nft, account, whitelisted);
            break;
        case /(0x38914ed8E9AB65554A23CcF285dfd212C13795cE|0x4E9eB6f6e04464eEe33Ae04Bf430E20529482e60|0x1d971Ac972F671c19D1bE00E4Fbf3118d3861851)/.test(collectionIdent):
            parsed = yield Forest(nft, account, whitelisted);
            break;
        default:
            parsed = yield evm.Default(nft, account, whitelisted);
            break;
    }
    return parsed;
});
exports.veChainParser = veChainParser;
const Planet = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const gqlQuery = (tokenId) => ({
        query: "\n    \n    fragment CollectionFields on TokenMarketplaceDTO {\n        collection {\n            collectionId\n            blockchainId\n            smartContractAddress\n            stakingContractAddresses\n            creatorAddress\n            name\n            customUrl\n            thumbnailImageUrl\n            placeholderImageUrl\n            isVerified\n            isVisible\n            isRevealed\n            type\n            importedAt\n            config\n        }\n    }\n\n    \n    fragment CreatorFields on TokenMarketplaceDTO {\n        creator {\n            address\n            name\n            customUrl\n            ipfsFileHash\n            profileImageUrl\n            blacklisted\n            verified\n            verifiedLevel\n        }\n    }\n\n    \n    fragment MediaFields on TokenMarketplaceDTO {\n        media {\n            url\n            mimeType\n            sizeType\n        }\n    }\n\n\n    query GetToken(\n        $tokenId: String!\n        $smartContractAddress: String!\n    ) {\n        token: getToken(\n            tokenId: $tokenId\n            smartContractAddress: $smartContractAddress\n        ) {\n            \ntokenId\nsmartContractAddress\nname\ndescription\ncreatorAddress\neditionsCount\nroyalty\nfileType\nfileUrl\nmetadataUrl\nmintedAt\nattributes\nscore\nrank\n...CollectionFields\n...CreatorFields\n...MediaFields\n\n        }\n    }\n",
        variables: {
            tokenId,
            smartContractAddress: "0x3473c5282057D7BeDA96C1ce0FE708e890764009",
        },
        operationName: "GetToken",
    });
    try {
        const response = yield (0, axios_1.default)(`${__1.proxy}https://mainnet.api.worldofv.art/graphql`, {
            method: "post",
            data: gqlQuery(tokenId),
        }).catch((e) => {
            return {
                data: null,
            };
        });
        let { data } = response;
        data = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.token;
        data = yield (0, tezos_1.checkEmptyFromTezos)(data);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            //wrapped: data.wrapped,
            metaData: {
                whitelisted,
                image: (0, _1.setupURI)(data === null || data === void 0 ? void 0 : data.fileUrl),
                imageFormat: ((_b = data.fileUrl.match(/\.([^.]*)$/)) === null || _b === void 0 ? void 0 : _b.at(1)) || "jpg",
                description: data === null || data === void 0 ? void 0 : data.escription,
                name: data === null || data === void 0 ? void 0 : data.name,
                attributes: data === null || data === void 0 ? void 0 : data.attributes,
                collectionName: "Exoworlds New",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
const WOVY = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield (0, axios_1.default)(`${__1.proxy}${uri}`).catch(() => ({
            data: null,
        }));
        const $ = cheerio.load(response.data);
        const script = $("#__NEXT_DATA__");
        const json = JSON.parse(script.get()[0].children[0].data);
        const metadata = (_e = (_d = (_c = json === null || json === void 0 ? void 0 : json.props) === null || _c === void 0 ? void 0 : _c.pageProps) === null || _d === void 0 ? void 0 : _d.token) === null || _e === void 0 ? void 0 : _e.token;
        const src = (0, _1.setupURI)(metadata.fileUrl);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: metadata === null || metadata === void 0 ? void 0 : metadata.wrapped,
            metaData: {
                whitelisted,
                image: src,
                imageFormat: "",
                description: metadata.description,
                animation_url: src,
                animation_url_format: "mp4",
                name: metadata.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
const Anon = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield (0, axios_1.default)(`${__1.proxy}${`https://blackv2.mypinata.cloud/ipfs/QmNrySrtR9E9VfnNGoJqohTvZh4K6Bo79L3eonRVk3xwUs/${tokenId}.json`}`).catch(() => ({
            data: null,
        }));
        let { data } = response;
        data = yield (0, tezos_1.checkEmptyFromTezos)(data);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data === null || data === void 0 ? void 0 : data.wrapped,
            metaData: {
                whitelisted,
                image: `https://blackv2.mypinata.cloud/ipfs/QmNrySrtR9E9VfnNGoJqohTvZh4K6Bo79L3eonRVk3xwUs/${tokenId}.png`,
                imageFormat: "png",
                description: data === null || data === void 0 ? void 0 : data.description,
                name: "Venonymous " + (data === null || data === void 0 ? void 0 : data.name),
                symbol: "VENONYMOUS",
                collectionName: "Venonymous",
                attributes: data === null || data === void 0 ? void 0 : data.attributes,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
const WrappedXPNET = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield (0, axios_1.default)(`${__1.proxy}${(0, _1.setupURI)(uri)}`).catch(() => ({
            data: null,
        }));
        let { data } = response;
        data = yield (0, tezos_1.checkEmptyFromTezos)(data);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data === null || data === void 0 ? void 0 : data.wrapped,
            metaData: {
                whitelisted,
                image: (0, _1.setupURI)(data.image),
                imageFormat: (_g = (_f = data.image) === null || _f === void 0 ? void 0 : _f.match(/\.([^.]*)$/)) === null || _g === void 0 ? void 0 : _g.at(1),
                description: data.description,
                name: data.name,
                symbol: data.symbol,
                attributes: data.attributes,
                contractType: data.type,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
const Forest = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = __1.proxy
            ? (yield pool.addRequest(`${__1.proxy}${(0, _1.setupURI)(uri)}`))
            : yield (0, axios_1.default)(`${__1.proxy}${(0, _1.setupURI)(uri)}`);
        let { data } = response;
        data = yield (0, tezos_1.checkEmptyFromTezos)(data);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data === null || data === void 0 ? void 0 : data.wrapped,
            metaData: {
                whitelisted,
                image: (0, _1.setupURI)(data.image),
                imageFormat: (_j = (_h = data.image) === null || _h === void 0 ? void 0 : _h.match(/\.([^.]*)$/)) === null || _j === void 0 ? void 0 : _j.at(1),
                description: data.description,
                name: data === null || data === void 0 ? void 0 : data.name,
                symbol: data.symbol,
                attributes: data.attributes,
                contractType: data.type,
                collectionName: data === null || data === void 0 ? void 0 : data.compiler,
            },
        };
        return nft;
    }
    catch (error) {
        console.log(error.message || "parse timeout forest");
        return nft;
    }
});
/**
 *
 * {
    "query": "\n            query itemList($filter:Filter, $page:Int, $perPage:Int, $sort:Sort){\n              itemList(filter:$filter, page:$page, perPage:$perPage, sortBy:$sort) {\n                    PlanetID\n                    PlanetName\n                    Image\n                    PlanetSector\n                    PlanetCoordinates\n                    Background\n                    BackgroundStarDensity\n                    BackgroundNebula\n                    SystemType\n                    StarOneType\n                    StarOneSpectralClass\n                    StarOneSpectralNumber\n                    StarOneSequence\n                    StarTwoType\n                    StarTwoSpectralClass\n                    StarTwoSpectralNumber\n                    StarTwoSequence\n                    StarThreeType\n                    StarThreeSpectralClass\n                    StarThreeSpectralNumber\n                    StarThreeSequence\n                    ExoClass\n                    MotherPlanetType\n                    MotherPlanetSubtype\n                    WorldType\n                    WorldSubtype\n                    Moons\n                    MoonOneType\n                    MoonTwoType\n                    MoonThreeType\n                    Ring\n                    RingType\n                    BioDiversityScale\n                    CarniverousVegetation\n                    SecretBiosphere\n                    Gaia\n                    IntelligentMicrobiome\n                    ApexPredators\n                    SentientLifeFormType\n                    FitnessFactor\n                    IntelligenceCapacity\n                    ConciousnessAffinity\n                    RarityScore\n                    Rank\n                    TokenOwner\n                    ItemID\n                    StartTime\n                    EndTime\n                    ReserveTokenPrice\n                    BuyoutTokenPrice\n                    ListingType\n                    Neighbor1\n                    Neighbor2\n                    Neighbor3\n                    Neighbor4\n                    Neighbor5\n                    Neighbor6\n                    Neighbor7\n                    Neighbor8\n                    Neighbor9\n                    Neighbor10\n                }\n            }",
    "variables": {
        "filter": {},
        "perPage": 20,
        "page": 0,
        "sort": {
            "OrderBy": "BuyoutTokenPrice",
            "OrderDirection": 1
        }
    },
    "operationName": "itemList"
}
 */
