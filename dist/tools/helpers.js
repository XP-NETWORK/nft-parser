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
exports.getUri = exports.getWrappedNft = void 0;
const axios_1 = __importDefault(require("axios"));
const factory_1 = require("../src/factory");
const getWrappedNft = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const res = yield (0, axios_1.default)(`https://nft.xp.network/w/${tokenId}`);
    const { data } = res;
    return {
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
            image: (0, factory_1.setupURI)(data === null || data === void 0 ? void 0 : data.image),
            imageFormat: (_a = data === null || data === void 0 ? void 0 : data.image) === null || _a === void 0 ? void 0 : _a.match(/(?:\.([^.]+))?$/)[1],
            attributes: data === null || data === void 0 ? void 0 : data.attributes,
            description: data === null || data === void 0 ? void 0 : data.description,
            name: data === null || data === void 0 ? void 0 : data.name,
        },
    };
});
exports.getWrappedNft = getWrappedNft;
const getUri = (nft) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getUri = getUri;
