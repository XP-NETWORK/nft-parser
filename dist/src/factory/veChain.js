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
exports.veChainParser = void 0;
const axios_1 = __importDefault(require("axios"));
const _1 = require(".");
const tezos_1 = require("./tezos");
const cheerio = require("cherio");
const veChainParser = (collectionIdent, nft, account, whitelisted, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    switch (collectionIdent) {
        case "0x5E6265680087520DC022d75f4C45F9CCD712BA97":
            parsed = yield WOVY(nft, account, whitelisted);
            break;
        case "0xf0E778BD5C4c2F219A2A5699e3AfD2D82D50E271":
            parsed = yield WrappedXPNET(nft, account, whitelisted);
            break;
        default:
            parsed = yield WrappedXPNET(nft, account, whitelisted);
            break;
    }
    return parsed;
});
exports.veChainParser = veChainParser;
const WOVY = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield (0, axios_1.default)(`${_1.proxy}${uri}`).catch(() => ({
            data: null,
        }));
        const $ = cheerio.load(response.data);
        const script = $("#__NEXT_DATA__");
        const json = JSON.parse(script.get()[0].children[0].data);
        const metadata = (_c = (_b = (_a = json === null || json === void 0 ? void 0 : json.props) === null || _a === void 0 ? void 0 : _a.pageProps) === null || _b === void 0 ? void 0 : _b.token) === null || _c === void 0 ? void 0 : _c.token;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            metaData: {
                whitelisted,
                image: "",
                imageFormat: "",
                description: metadata.description,
                animation_url: (0, _1.setupURI)(metadata.fileUrl),
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
const WrappedXPNET = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield (0, axios_1.default)(`${_1.proxy}${(0, _1.setupURI)(uri)}`).catch(() => ({
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
            metaData: {
                whitelisted,
                image: (0, _1.setupURI)(data.image),
                imageFormat: (_e = (_d = data.image) === null || _d === void 0 ? void 0 : _d.match(/\.([^.]*)$/)) === null || _e === void 0 ? void 0 : _e.at(1),
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
