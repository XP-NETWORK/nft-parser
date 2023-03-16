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
import requestPool from "../../tools/requestPool";
import { setupURI } from ".";
import { proxy } from "..";
const pool = requestPool(3000);
const cheerio = require("cherio");
export const tonParser = (collectionIdent, nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    switch (true) {
        default:
            parsed = yield Default(nft, account, whitelisted);
            break;
    }
    return parsed;
});
const getNFTfromTonApi = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios(proxy + `https://api.ton.cat/v2/contracts/nft/${address}`).catch((e) => {
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
        const url = setupURI(uri);
        const res = yield axios(proxy + url).catch((e) => ({ data: undefined }));
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
            return Object.assign(Object.assign({}, nft), (((_e = error === null || error === void 0 ? void 0 : error.response) === null || _e === void 0 ? void 0 : _e.status) === 404 ? { errorStatus: 404 } : {}));
        }
    }
    try {
        const imgUrl = setupURI((native === null || native === void 0 ? void 0 : native.image) ||
            ((_f = data.image) === null || _f === void 0 ? void 0 : _f.original) ||
            (typeof (data === null || data === void 0 ? void 0 : data.image) === "string" && (data === null || data === void 0 ? void 0 : data.image)));
        let _contract;
        if (tokenId === contract) {
            if (collectionAddress) {
                _contract = collectionAddress;
            }
            else {
                const res = yield getNFTfromTonApi(tokenId);
                _contract = ((_g = res.data) === null || _g === void 0 ? void 0 : _g.nft_item["collection_address"]) || "SingleNFt";
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
