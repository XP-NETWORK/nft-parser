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
exports.tonParser = void 0;
const axios_1 = __importDefault(require("axios"));
const requestPool_1 = __importDefault(require("../../tools/requestPool"));
const _1 = require(".");
const __1 = require("..");
const pool = (0, requestPool_1.default)(3000);
const cheerio = require("cherio");
const tonParser = (collectionIdent, nft, account, whitelisted, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    switch (true) {
        default:
            parsed = yield Default(nft, account, whitelisted);
            break;
    }
    return parsed;
});
exports.tonParser = tonParser;
const Default = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { native, native: { contract, tokenId, chainId, address }, collectionIdent, uri, } = nft;
    let data;
    try {
        const url = (0, _1.setupURI)(uri);
        const res = yield (0, axios_1.default)(__1.proxy + url).catch((e) => ({ data: undefined }));
        data = res.data;
        console.log({ data });
    }
    catch (e) {
        try {
            const res = yield (0, axios_1.default)(__1.proxy + `https://api.ton.cat/v2/contracts/nft/${address}`).catch((e) => ({ data: undefined }));
            data = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.nft_item) === null || _b === void 0 ? void 0 : _b.metadata;
        }
        catch (error) {
            console.log((error === null || error === void 0 ? void 0 : error.message) || "parse timeout forest");
            return Object.assign(Object.assign({}, nft), (((_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.status) === 404 ? { errorStatus: 404 } : {}));
        }
    }
    const nftRes = {
        native,
        chainId,
        tokenId,
        owner: account,
        uri,
        contract,
        collectionIdent,
        metaData: {
            whitelisted,
            image: (0, _1.setupURI)(native.image),
            imageFormat: (_e = (_d = native.image) === null || _d === void 0 ? void 0 : _d.match(/\.([^.]*)$/)) === null || _e === void 0 ? void 0 : _e.at(1),
            description: data === null || data === void 0 ? void 0 : data.description,
            name: (data === null || data === void 0 ? void 0 : data.name) || native.name,
            attributes: data === null || data === void 0 ? void 0 : data.attributes,
            collectionName: native.collectionName,
        },
    };
    console.log({ nftRes });
    return nftRes;
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
