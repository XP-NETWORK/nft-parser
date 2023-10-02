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
const _1 = require(".");
const __1 = require("..");
const __2 = require("..");
const tonParser = (_, nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    switch (true) {
        case /^tonstorage/.test(nft.uri): {
            parsed = yield TonStorage(nft, account, whitelisted);
            break;
        }
        default:
            parsed = yield Default(nft, account, whitelisted);
            break;
    }
    return parsed;
});
exports.tonParser = tonParser;
const getNFTfromTonApi = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, axios_1.default)(__2.proxy + `https://api.ton.cat/v2/contracts/nft/${address}`).catch((e) => {
        console.log(e, "e");
        return { data: undefined };
    });
    return res;
});
const Default = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { native, native: { contract, tokenId, chainId }, uri, } = nft;
    let data;
    let newUri = "";
    let collectionAddress = "";
    try {
        const url = (0, _1.setupURI)(uri);
        const res = yield (0, axios_1.default)((url.match(/^data\:application/) ? "" : __2.proxy) + url).catch((e) => ({
            data: undefined,
        }));
        data = res.data;
    }
    catch (e) {
        try {
            const res = yield getNFTfromTonApi(tokenId);
            data = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.nft_item) === null || _b === void 0 ? void 0 : _b.metadata;
            newUri = (_c = res.data) === null || _c === void 0 ? void 0 : _c.nft_item["content_url"];
            collectionAddress =
                ((_d = res.data) === null || _d === void 0 ? void 0 : _d.nft_item["collection_address"]) || "SingleNFt";
        }
        catch (error) {
            console.log((error === null || error === void 0 ? void 0 : error.message) || "parse timeout forest");
            return Object.assign(Object.assign({}, nft), (((_e = error === null || error === void 0 ? void 0 : error.response) === null || _e === void 0 ? void 0 : _e.status) === 404
                ? { errorStatus: 404 }
                : {}));
        }
    }
    try {
        const imgUrl = (0, _1.setupURI)((native === null || native === void 0 ? void 0 : native.image) ||
            ((_f = data.image) === null || _f === void 0 ? void 0 : _f.original) ||
            (typeof (data === null || data === void 0 ? void 0 : data.image) === "string" && (data === null || data === void 0 ? void 0 : data.image)));
        let _contract;
        if (tokenId === contract) {
            if (collectionAddress) {
                _contract = collectionAddress;
            }
            else {
                const res = yield getNFTfromTonApi(tokenId);
                _contract =
                    ((_g = res.data) === null || _g === void 0 ? void 0 : _g.nft_item["collection_address"]) || "SingleNFt";
            }
        }
        else {
            _contract = contract;
        }
        const nftRes = {
            native: Object.assign(Object.assign({}, native), { uri: newUri || uri }),
            chainId,
            tokenId,
            owner: account,
            uri: newUri || uri,
            contract: _contract,
            collectionIdent: _contract,
            metaData: {
                whitelisted,
                image: imgUrl,
                imageFormat: (_h = imgUrl.match(/\.([^.]*)$/)) === null || _h === void 0 ? void 0 : _h.at(1),
                description: data === null || data === void 0 ? void 0 : data.description,
                name: (data === null || data === void 0 ? void 0 : data.name) || native.name,
                attributes: data === null || data === void 0 ? void 0 : data.attributes,
                collectionName: native.collectionName,
            },
        };
        return nftRes;
    }
    catch (e) {
        console.log((e === null || e === void 0 ? void 0 : e.message) || e, "in ton Parser");
    }
});
const TonStorage = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l, _m, _o, _p;
    const { native: { tokenId }, wrapped, } = nft;
    try {
        const address = encodeURIComponent(wrapped ? wrapped.item_address : tokenId);
        const uri = `https://tonapi.io/v2/nfts/${address}`;
        const res = (yield (0, axios_1.default)(uri)).data;
        if (res) {
            const image = (_k = (_j = res.previews) === null || _j === void 0 ? void 0 : _j.at(-1)) === null || _k === void 0 ? void 0 : _k.url;
            const nftRes = Object.assign(Object.assign({}, nft), { owner: account, uri, metaData: {
                    whitelisted,
                    image,
                    imageFormat: (0, __1.extractType)(image),
                    description: (_l = res.collection) === null || _l === void 0 ? void 0 : _l.description,
                    name: (_m = res.collection) === null || _m === void 0 ? void 0 : _m.name,
                    attributes: (_o = res.metadata) === null || _o === void 0 ? void 0 : _o.attributes,
                    collectionName: (_p = res.metadata) === null || _p === void 0 ? void 0 : _p.name,
                } });
            return nftRes;
        }
    }
    catch (e) {
        //console.log(e, "e");
        return nft;
    }
});
