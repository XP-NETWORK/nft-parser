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
import { sendTelegramMessage } from "../../tools/telegram";
import { proxy } from "..";
import { Base64 } from "js-base64";
import { videoFormats } from "..";
const imageFormats = ["JPG", "JPEG", "GIF", "PNG"];
export const elrondParser = (collectionIdent, nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    let parsed;
    switch (collectionIdent) {
        case "AERMES-ac9886": {
            parsed = yield AERMES(nft, account, whitelisted);
            break;
        }
        case "DRIFTERS-efd96c": {
            parsed = yield DRIFTERS(nft, account, whitelisted);
            break;
        }
        case "NIFTYREX-d8c812": {
            parsed = yield DRIFTERS(nft, account, whitelisted);
            break;
        }
        case "INNOVATOR-fca3a7": {
            parsed = yield INNOVATOR(nft, account, whitelisted);
            break;
        }
        case "CGPASS-73ac68": {
            parsed = yield MEDUSA(nft, account, whitelisted);
            break;
        }
        case "ORC-ef544d": {
            parsed = yield ORC(nft, account, whitelisted);
            break;
        }
        case "STRAYCATS-b079a7": {
            parsed = yield WrappedXPNET(nft, account, whitelisted);
            break;
        }
        case "PMONC-4032bc": {
            parsed = yield WrappedXPNET(nft, account, whitelisted);
            break;
        }
        case "TAKANNE-3db244": {
            parsed = yield APOPHIS(nft, account, whitelisted);
            break;
        }
        case "KINGSGUARD-8e5d07": {
            parsed = yield KINGSGUARD(nft, account, whitelisted);
            break;
        }
        case "ALIEN-a499ab": {
            parsed = yield ALIEN(nft, account, whitelisted);
            break;
        }
        case "HOKIZUKI-2fe117": {
            parsed = yield HOKI(nft, account, whitelisted);
            break;
        }
        case "NBERGS-139351": {
            parsed = yield NBERGS(nft, account, whitelisted);
            break;
        }
        default:
            parsed = yield DEFAULT(nft, account, whitelisted);
            break;
    }
    return parsed;
});
export const DEFAULT = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const res = yield axios(`https://api.elrond.com/nfts/${tokenId}`).catch((e) => ({ data: null }));
        // console.log(res);
        const { data } = res;
        const img = data.url ||
            ((_a = data === null || data === void 0 ? void 0 : data.metadata) === null || _a === void 0 ? void 0 : _a.image) ||
            Base64.decode((data === null || data === void 0 ? void 0 : data.uris[1]) || (data === null || data === void 0 ? void 0 : data.uris[0]));
        const format = img.match(/\.[0-9a-z]+$/i)[0].replace(".", "");
        console.log({ img, format, tokenId });
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
                image: imageFormats.includes(format === null || format === void 0 ? void 0 : format.toUpperCase()) ? img : "",
                imageFormat: imageFormats.includes(format === null || format === void 0 ? void 0 : format.toUpperCase()) ? format : "",
                animation_url: videoFormats.includes(format === null || format === void 0 ? void 0 : format.toUpperCase())
                    ? img
                    : undefined,
                animation_url_format: videoFormats.includes(format === null || format === void 0 ? void 0 : format.toUpperCase())
                    ? format
                    : undefined,
                attributes: ((_b = data === null || data === void 0 ? void 0 : data.metadata) === null || _b === void 0 ? void 0 : _b.attributes) || (data === null || data === void 0 ? void 0 : data.attributes),
                name: ((_c = data === null || data === void 0 ? void 0 : data.metadata) === null || _c === void 0 ? void 0 : _c.name) || (data === null || data === void 0 ? void 0 : data.name),
                description: (_d = data === null || data === void 0 ? void 0 : data.metadata) === null || _d === void 0 ? void 0 : _d.description,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(((_e = error === null || error === void 0 ? void 0 : error.response) === null || _e === void 0 ? void 0 : _e.status) || error);
        const resp = yield tryBasic(nft, account, whitelisted);
        if (resp) {
            return resp;
        }
        else {
            yield sendTelegramMessage(nft);
            return Object.assign(Object.assign({}, nft), (((_f = error.response) === null || _f === void 0 ? void 0 : _f.status) === 404 ? { errorStatus: 404 } : {}));
        }
    }
});
const tryBasic = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const format = uri
            .match(/\.[0-9a-z]+$/i)[0]
            .replace(".", "")
            .toUpperCase();
        if (imageFormats.includes(format) || videoFormats.includes(format))
            return;
        const res = yield axios(proxy + uri).catch((e) => ({ data: null }));
        const { data } = res;
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
                image: setupURI(data.image),
                imageFormat: data.image.match(/\.[0-9a-z]+$/i)[0].replace(".", ""),
                name: data.name,
                attributes: data.attributes,
                description: data.description,
            },
        };
        return nft;
    }
    catch (err) {
        return undefined;
    }
});
export const AERMES = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
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
                animation_url: uri,
                animation_url_format: "mp4",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
export const DRIFTERS = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
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
                image: uri.replace(".json", ".png"),
                imageFormat: "png",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
export const APOPHIS = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
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
                image: uri.replace(".json", ".png"),
                imageFormat: "png",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
export const INNOVATOR = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield axios(uri);
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
                image: data.image,
                imageFormat: "png",
                name: data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
export const MEDUSA = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield axios(uri);
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
                image: setupURI(data.image),
                imageFormat: "png",
                name: data.name,
                attributes: data.attributes,
                description: data.description,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
export const ORC = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield axios(proxy + uri);
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
                image: uri.replace(".json", ".png"),
                imageFormat: "png",
                attributes: data.attributes,
                description: data.description,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
export const KINGSGUARD = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        //const { data } = await axios(proxy + uri);
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
                image: `https://media.elrond.com/nfts/asset/QmbtT4ca7TjE8fKd9ufkNm3H2sD9caz4GZ7VPn76Burx4J/${(_g = uri
                    .match(/([^\/]+$)/)) === null || _g === void 0 ? void 0 : _g.at(0).replace(/\D+/, "")}.jpg`,
                imageFormat: "jpg",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
//KINGSGUARD
export const ALIEN = ORC;
///https://ipfs.io/ipfs/QmcnUiaXw3Gjy1cXDnXTnhWahW2h4kqJiXp88wya9yJYj9/5437.json
export const NBERGS = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    console.log("dora");
    try {
        const { data } = yield axios(proxy + uri);
        console.log(data);
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
                image: `https://ipfs.io/ipfs/QmcnUiaXw3Gjy1cXDnXTnhWahW2h4kqJiXp88wya9yJYj9/${(_h = uri
                    .match(/\d+(?=\.json)/)) === null || _h === void 0 ? void 0 : _h.at(0)}.png`,
                imageFormat: "png",
                name: data === null || data === void 0 ? void 0 : data.name,
                attributes: data === null || data === void 0 ? void 0 : data.attributes,
                description: data === null || data === void 0 ? void 0 : data.description,
                collectionName: "Nicebergs NFT",
            },
        };
        return nft;
    }
    catch (error) {
        console.log(error);
        return Object.assign(Object.assign({}, nft), (((_j = error.response) === null || _j === void 0 ? void 0 : _j.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
export const WrappedXPNET = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m, _o;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield axios(proxy + uri);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data.wrapped,
            metaData: Object.assign(Object.assign({ whitelisted, image: data.image, imageFormat: (_l = (_k = data.image) === null || _k === void 0 ? void 0 : _k.match(/\.([^.]*)$/)) === null || _l === void 0 ? void 0 : _l.at(1), name: data.name, attributes: data.attributes, description: data.description }, (data.animation_url ? { animation_url: data.animation_url } : {})), (data.animation_url
                ? {
                    animation_url_format: (_o = (_m = data.animation_url) === null || _m === void 0 ? void 0 : _m.match(/\.([^.]*)$/)) === null || _o === void 0 ? void 0 : _o.at(1),
                }
                : {})),
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
export const HOKI = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _p, _q, _r, _s;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield axios(proxy + uri);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data.wrapped,
            metaData: Object.assign(Object.assign({ whitelisted, image: setupURI(data.image.replace("NewUriToReplace", "QmcnpaWrFmJjiq7nSnomyogsL5CVHjmTL1HLFeKeTz3Fia")), imageFormat: (_q = (_p = data.image) === null || _p === void 0 ? void 0 : _p.match(/\.([^.]*)$/)) === null || _q === void 0 ? void 0 : _q.at(1), name: data.name, attributes: data.attributes, description: data.description }, (data.animation_url ? { animation_url: data.animation_url } : {})), (data.animation_url
                ? {
                    animation_url_format: (_s = (_r = data.animation_url) === null || _r === void 0 ? void 0 : _r.match(/\.([^.]*)$/)) === null || _s === void 0 ? void 0 : _s.at(1),
                }
                : {})),
        };
        return nft;
    }
    catch (error) {
        return Object.assign(Object.assign({}, nft), { errorStatus: 429 });
    }
});
export const Default = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _t, _u, _v, _w, _x;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    console.log("ds");
    try {
        let data;
        if (/(png|jpe?g)/.test(uri)) {
            data = {
                image: setupURI(uri),
            };
        }
        else {
            const res = yield axios(proxy + uri);
            data = res.data;
        }
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data.wrapped,
            metaData: Object.assign(Object.assign({ whitelisted, image: data.image, imageFormat: (_u = (_t = data.image) === null || _t === void 0 ? void 0 : _t.match(/\.([^.]*)$/)) === null || _u === void 0 ? void 0 : _u.at(1), name: data.name, attributes: data.attributes, description: data.description }, (data.animation_url ? { animation_url: data.animation_url } : {})), (data.animation_url
                ? {
                    animation_url_format: (_w = (_v = data.animation_url) === null || _v === void 0 ? void 0 : _v.match(/\.([^.]*)$/)) === null || _w === void 0 ? void 0 : _w.at(1),
                }
                : {})),
        };
        return nft;
    }
    catch (error) {
        console.error(((_x = error === null || error === void 0 ? void 0 : error.response) === null || _x === void 0 ? void 0 : _x.status) || error);
        return nft;
    }
});
