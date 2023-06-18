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
exports.nearParser = void 0;
const axios_1 = __importDefault(require("axios"));
const evm = __importStar(require("./index"));
const nearParser = (collectionIdent, nft, account, whitelisted, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    let parsed;
    switch (collectionIdent) {
        default: {
            let uri;
            try {
                uri = evm.setupURI(nft.uri);
            }
            catch (_f) {
                uri = false;
            }
            if (uri) {
                parsed = yield evm
                    .Default(nft, account, whitelisted)
                    .catch((e) => nft);
            }
            else {
                if (nft.media.match(/^\d+\.\S+$/)) {
                    const res = (yield (0, axios_1.default)(`https://api-v2-mainnet.paras.id/token?token_series_id=${nft.native.token_id}&contract_id=${collectionIdent}`)).data;
                    if (!res.data)
                        return;
                    const { data: { results }, } = res;
                    const data = results[0].metadata;
                    data.image = data.media;
                    return Object.assign(Object.assign({}, nft), { metaData: Object.assign(Object.assign({}, data), { imageFormat: ((_b = (_a = data.image) === null || _a === void 0 ? void 0 : _a.match(/(?:\.([^.]+))?$/)) === null || _b === void 0 ? void 0 : _b.at(1)) ||
                                "" }) });
                }
                parsed = Object.assign(Object.assign({}, nft), { metaData: {
                        name: nft.title,
                        description: nft.description,
                        collectionName: nft.collectionIdent,
                        attributes: nft.attributes,
                    } });
            }
            break;
        }
    }
    if (!((_c = parsed.metaData) === null || _c === void 0 ? void 0 : _c.image)) {
        parsed.metaData.image = nft.image;
        parsed.metaData.imageFormat =
            ((_e = (_d = nft.image) === null || _d === void 0 ? void 0 : _d.match(/(?:\.([^.]+))?$/)) === null || _e === void 0 ? void 0 : _e.at(1)) || "";
    }
    return parsed;
});
exports.nearParser = nearParser;
