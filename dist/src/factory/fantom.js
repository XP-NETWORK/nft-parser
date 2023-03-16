var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { setupURI } from ".";
import { checkEmptyFromTezos } from "./tezos";
import { proxy } from "..";
import { Default } from "./index";
export const fantomParser = (collectionIdent, nft, account, whitelisted, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    switch (collectionIdent) {
        case "0xb3bd794bd00e1711c55ceb5c452d74c0d8be292d":
            parsed = yield Falacy(nft, account, whitelisted);
            break;
        case "0xcFa4d04d1CCbE4dda0635DEDB61601B50B13AD8e":
            parsed = yield Runner(nft, account, whitelisted);
            break;
        default:
            parsed = yield Default(nft, account, whitelisted);
            break;
    }
    return parsed;
});
const Runner = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const res = yield axios(`${proxy}${uri.replace("ipfs.moralis.io:2053", "ipfs.io")}`);
        const { data } = res;
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
                image: setupURI(data === null || data === void 0 ? void 0 : data.image),
                imageFormat: "png",
                description: data === null || data === void 0 ? void 0 : data.description,
                name: data === null || data === void 0 ? void 0 : data.name,
                attributes: data === null || data === void 0 ? void 0 : data.attributes,
            },
        };
        return nft;
    }
    catch (error) {
        console.log(error);
        return nft;
    }
});
const Falacy = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const res = yield axios(`${proxy}${uri}`);
        const { data } = res;
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
                image: `https://ipfs.moralis.io:2053/ipfs/${data.image.replace("ipfs://", "")}`,
                imageFormat: "png",
                description: data === null || data === void 0 ? void 0 : data.description,
                name: data === null || data === void 0 ? void 0 : data.name,
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
    var _a;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield axios(`${proxy}${uri}`).catch(() => ({
            data: null,
        }));
        let { data } = response;
        data = yield checkEmptyFromTezos(data);
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
                image: setupURI(data === null || data === void 0 ? void 0 : data.image),
                imageFormat: "png",
                description: data === null || data === void 0 ? void 0 : data.description,
                name: data === null || data === void 0 ? void 0 : data.name,
                symbol: data === null || data === void 0 ? void 0 : data.symbol,
                attributes: data === null || data === void 0 ? void 0 : data.attributes,
                contractType: data === null || data === void 0 ? void 0 : data.type,
            },
        };
        return nft;
    }
    catch (error) {
        return Object.assign(Object.assign({}, nft), (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
