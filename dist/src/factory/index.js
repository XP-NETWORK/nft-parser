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
import { checkEmptyFromTezos } from "./tezos";
import requestPool from "../../tools/requestPool";
import { getAssetFormat, tryPinataWrapper } from "../../tools/helpers";
import { proxy } from "..";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
import { videoFormats } from "..";
import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
import punksABI from "../../abi/punks.json";
//const svgToImg = require("svg-to-img");
const pool = requestPool(3000);
const ethersProvider = new JsonRpcProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
Moralis.start({
    apiKey: "NT2aMb8xO5y2IcPxYSd4RvchrzV8wKnzCSHoIdMVF3Y0dTOw4x0AVQ9wrCJpIoBB",
});
export const setupURI = (uri) => {
    if (uri) {
        if (uri.includes(".json")) {
            uri = uri.replace(/(?!\.json)\d+$/gm, "");
        }
        if (uri.includes("https://ipfs.io") || uri.includes("moralis")) {
            return uri;
        }
        else if (/^ipfs:\/\//.test(uri)) {
            return uri.replace(/ipfs:\/\/(?:ipfs)?/, "https://ipfs.io/ipfs/"); // "https://ipfs.io/ipfs/" + uri.split("://")[1];
        }
        else if (/^https\:\/\/ipfs.io/.test(uri)) {
            return uri;
        }
        else if (uri.includes("data:image/") ||
            uri.includes("data:application/")) {
            return uri;
        }
        else if (uri[0] === "Q") {
            return `https://ipfs.io/ipfs/${uri}`;
        }
        else if (uri.includes("http://")) {
            return uri.replace("http://", "https://");
        }
        else if (/^https\:\/\//.test(uri)) {
            return uri;
        }
        else {
            throw new Error("unknown uri format");
        }
    }
    else {
        return uri;
    }
};
export const Default = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = setupURI(uri);
    const url = setupURI(baseUrl);
    try {
        let response;
        if (url.includes("moralis")) {
            let chain;
            switch (String(chainId)) {
                case "7":
                    chain = EvmChain.POLYGON;
                    response = yield moralis(contract, tokenId, chain);
                    response = { data: response };
                    break;
                case "5":
                    chain = EvmChain.ETHEREUM;
                    response = yield moralis(contract, tokenId, chain);
                    response = { data: response };
                    break;
                case "4":
                    chain = EvmChain.BSC;
                    response = yield moralis(contract, tokenId, chain);
                    response = { data: response };
                    break;
                case "6":
                    chain = EvmChain.AVALANCHE;
                    response = yield moralis(contract, tokenId, chain);
                    response = { data: response };
                    break;
                case "8":
                    chain = EvmChain.FANTOM;
                    response = yield moralis(contract, tokenId, chain);
                    response = { data: response };
                    break;
                default:
                    response = undefined;
                    break;
            }
        }
        if (!response) {
            response = yield tryPinataWrapper((url) => axios(url))(url);
        }
        let { data } = response;
        if (data === "Post ID not found") {
            throw new Error("404");
        }
        if (typeof data.nft === "object") {
            data = Object.assign({}, data.nft);
        }
        let image = data.image ||
            data.image_url ||
            data.imageUrl ||
            data.image_data ||
            data.url;
        let format = yield getAssetFormat(image).catch((e) => "");
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract: contract || collectionIdent,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: Object.assign(Object.assign(Object.assign(Object.assign({ whitelisted }, (!videoFormats.includes(format === null || format === void 0 ? void 0 : format.toUpperCase())
                ? { image: setupURI(image) }
                : { image: "" })), { animation_url: setupURI(data.animation_url) }), (videoFormats.includes(format === null || format === void 0 ? void 0 : format.toUpperCase())
                ? { animation_url_format: format }
                : { animation_url_format: undefined })), { imageFormat: format, attributes: data.attributes, description: data.description, name: data.name }),
        };
        return nft;
    }
    catch (error) {
        const noMoralis = uri.replace(/ipfs\.moralis\.io\:\d+/, "ipfs.io");
        const resp = yield tryBasic(noMoralis);
        if (resp) {
            let format = yield getAssetFormat(resp.image).catch((e) => "");
            const nft = {
                native,
                chainId,
                tokenId,
                owner: account,
                uri: noMoralis,
                contract: contract || collectionIdent,
                collectionIdent,
                wrapped: resp && resp.wrapped,
                metaData: {
                    whitelisted,
                    image: setupURI(resp.image),
                    imageFormat: format,
                    attributes: resp.attributes,
                    description: resp.description,
                    name: resp.name,
                },
            };
            return nft;
        }
        console.error("error in default parser: ", error.message);
        //await sendTelegramMessage(nft);
        return Object.assign(Object.assign({}, nft), (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
const tryBasic = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios(setupURI(url));
        return response.data;
    }
    catch (error) {
        return undefined;
    }
});
const moralis = (address, tokenId, chain) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    try {
        const response = (yield Moralis.EvmApi.nft.getNFTMetadata({
            address,
            chain,
            tokenId,
        }));
        console.log(response.jsonResponse);
        if (!((_b = response.jsonResponse) === null || _b === void 0 ? void 0 : _b.metadata) && ((_c = response.jsonResponse) === null || _c === void 0 ? void 0 : _c.token_uri)) {
            try {
                let uri = (_d = response.jsonResponse) === null || _d === void 0 ? void 0 : _d.token_uri;
                const spl = uri.split("/");
                // console.log(uri.replace(spl[5].split(".")[0], String(Number(spl[5].split(".")[0]))))
                const newUri = uri.replace(spl[5].split(".")[0], String(Number(spl[5].split(".")[0])));
                let meta = yield axios.get(newUri);
                //console.log(meta.data);
                return meta.data;
            }
            catch (error) {
                return undefined;
            }
        }
        //@ts-ignore
        return JSON.parse((_e = response.jsonResponse) === null || _e === void 0 ? void 0 : _e.metadata);
    }
    catch (error) {
        throw error;
    }
});
export const SWAPABLE = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    nft.uri = nft.uri.replace(/([^\/]+)$/, (_f = nft.native) === null || _f === void 0 ? void 0 : _f.tokenId);
    return Default(nft, account, whitelisted);
});
export const CRYPTO_PUNKS = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    const { native, native: { contract, tokenId, chainId, name }, collectionIdent, uri, } = nft;
    try {
        const _contract = new ethers.Contract("0x16F5A35647D6F03D5D3da7b35409D65ba03aF3B2", punksABI, ethersProvider);
        const [rawAttrs, imgSVG] = yield Promise.all([
            _contract.punkAttributes(Number(tokenId)),
            _contract.punkImageSvg(Number(tokenId)),
        ]);
        const attrs = rawAttrs.split(",").map((trait, idx) => {
            return {
                key: idx === 0 ? "Type" : "Accessory",
                value: trait.trim(),
            };
        });
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
                image: imgSVG,
                imageFormat: "svg",
                attributes: attrs,
                name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_g = error.response) === null || _g === void 0 ? void 0 : _g.status) === 429 ? { errorStatus: 429 } : {})), (((_h = error.response) === null || _h === void 0 ? void 0 : _h.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0x0271c6853d4b2bdccd53aaf9edb66993e14d4cba
// ! 0x4508af04de4073b10a53ac416eb311f4a2ab9569
export const ART_NFT_MATIC = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data } = response;
        const { headers } = yield axios(`${proxy}${data.image}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data.image,
                imageFormat: format,
                attributes: data.attributes,
                name: data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_j = error.response) === null || _j === void 0 ? void 0 : _j.status) === 429 ? { errorStatus: 429 } : {})), (((_k = error.response) === null || _k === void 0 ? void 0 : _k.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0xa8a079ea48dc846899bdb542f3728dbc6758fdfa
export const EtherHead = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data.image,
                imageFormat: "png",
                description: data.description,
                name: data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_l = error.response) === null || _l === void 0 ? void 0 : _l.status) === 429 ? { errorStatus: 429 } : {})), (((_m = error.response) === null || _m === void 0 ? void 0 : _m.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0x6e1ecc59f4005d0f2707ab7a0a8cecbaba41c11e
export const AngelOfAether = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data.image,
                imageFormat: "jpg",
                description: data.description,
                name: data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_o = error.response) === null || _o === void 0 ? void 0 : _o.status) === 429 ? { errorStatus: 429 } : {})), (((_p = error.response) === null || _p === void 0 ? void 0 : _p.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0xe5b3903ffb3a00e91c75e25a4bd6616d3171e45e
export const Legend = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _q, _r;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data } = response;
        const { headers } = yield axios(`${proxy}${setupURI(data.image)}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: format,
                attributes: data.attributes,
                name: data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_q = error.response) === null || _q === void 0 ? void 0 : _q.status) === 429 ? { errorStatus: 429 } : {})), (((_r = error.response) === null || _r === void 0 ? void 0 : _r.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0xee6d7e31ea2095df9b2f89ec15111d3de5cd39af
// ! AlphaBettyDoodle
export const AlphaBettyDoodle = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _s, _t;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data } = response;
        const { headers } = yield axios(`${proxy}${setupURI(data.image)}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
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
        return Object.assign(Object.assign(Object.assign({}, nft), (((_s = error.response) === null || _s === void 0 ? void 0 : _s.status) === 429 ? { errorStatus: 429 } : {})), (((_t = error.response) === null || _t === void 0 ? void 0 : _t.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
export const Mabstronauts = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _u, _v;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: `https://ipfs.io/ipfs/${data.image}`,
                imageFormat: "png",
                name: data.name,
                symbol: data.symbol,
                description: data.description,
                contractType: "erc1155",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_u = error.response) === null || _u === void 0 ? void 0 : _u.status) === 429 ? { errorStatus: 429 } : {})), (((_v = error.response) === null || _v === void 0 ? void 0 : _v.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0x0D41c70E20587c2ec1cea9c4A3d394eC63C4bfbe
export const RocketMonsters = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _w, _x;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data } = response;
        const { headers } = yield axios(`${proxy}${setupURI(data.image)}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: format,
                name: data.name,
                description: data.direction,
                attributes: data.attributes,
                contractType: "erc721",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_w = error.response) === null || _w === void 0 ? void 0 : _w.status) === 429 ? { errorStatus: 429 } : {})), (((_x = error.response) === null || _x === void 0 ? void 0 : _x.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
//0xc97e56Cd5777b46015F88BBB047f90cf556f520b
// ! 0xDcAA2b071c1851D8Da43f85a34a5A57d4Fa93A1A
export const TheBlackMagic = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _y, _z;
    // debugger;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    const imageFormats = ["gif", "jpg", "jpeg", "png", "svg", "webp"];
    let nestedImage;
    try {
        const response = yield axios(url);
        let { data } = response;
        data = yield checkEmptyFromTezos(data);
        const imgResp = yield axios(setupURI(data.image));
        const headers = imgResp.headers["content-type"];
        let formats;
        let mimeType;
        let format;
        if (headers.slice(headers.lastIndexOf("/") + 1) === "json") {
            nestedImage = true;
        }
        else if (imageFormats.some((f) => f === headers.slice(headers.lastIndexOf("/") + 1))) {
            nestedImage = false;
        }
        if (nestedImage) {
            formats = imgResp.data.formats;
            mimeType = imgResp.data.formats[0].mimeType;
        }
        else {
            format = headers.slice(headers.lastIndexOf("/") + 1);
        }
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: nestedImage
                    ? setupURI(imgResp.data.formats[0].uri)
                    : setupURI(data.image),
                imageFormat: nestedImage
                    ? mimeType.slice(mimeType.lastIndexOf("/") + 1)
                    : format,
                name: imgResp.data.name || data.name,
                description: imgResp.data.description || data.description,
                symbol: imgResp.data.symbol || data.symbols,
                attributes: data.attributes || imgResp.data.attributes,
                contractType: "erc721",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_y = error.response) === null || _y === void 0 ? void 0 : _y.status) === 429 ? { errorStatus: 429 } : {})), (((_z = error.response) === null || _z === void 0 ? void 0 : _z.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0x4c1900270dbf0c1e6a9c984aef9a18a7cb9ab1cc
export const CartelPunks = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _0, _1;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data } = response;
        const imgResp = yield axios(setupURI(data.image));
        const mimeType = imgResp.headers["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri,
            contract,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: format,
                name: data.name,
                attributes: data.attributes,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_0 = error.response) === null || _0 === void 0 ? void 0 : _0.status) === 429 ? { errorStatus: 429 } : {})), (((_1 = error.response) === null || _1 === void 0 ? void 0 : _1.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0x36f8f51f65fe200311f709b797baf4e193dd0b0d
export const TreatNFT = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _2, _3;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const newUrl = `${proxy}https://treatdao.com/api/nft/${tokenId}`;
    try {
        const response = yield axios(newUrl);
        const { data } = response;
        // const imgResp = await axios(setupURI(data.image));
        // const mimeType = imgResp.headers["content-type"];
        // const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const format = yield getAssetFormat(setupURI(data.image));
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent: "0x36F8f51f65Fe200311F709b797baF4E193DD0b0D",
            owner: account,
            uri: newUrl,
            contract: "0x36F8f51f65Fe200311F709b797baF4E193DD0b0D",
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data.image,
                imageFormat: format,
                name: data.name,
                attributes: data.attributes,
                contractType: "ERC1155",
                collectionName: "Treat NFT",
                description: data.description,
            },
        };
        return nft;
    }
    catch (error) {
        console.log(error.code);
        // if (error.code === "ERR_BAD_REQUEST") throw error.code;
        return Object.assign(Object.assign(Object.assign({}, nft), (((_2 = error.response) === null || _2 === void 0 ? void 0 : _2.status) === 429 ? { errorStatus: 429 } : {})), (((_3 = error.response) === null || _3 === void 0 ? void 0 : _3.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
//0x2c83eaf6e460c673d92477a7c49eb4ecd04e1216
//c
// ! 0x2c83eaf6e460c673d92477a7c49eb4ecd04e1216
export const IdoDirt = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _4, _5;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const newUrl = `${proxy}https://treatdao.com/api/nft/${tokenId}`;
    try {
        const response = yield axios(newUrl);
        const { data } = response;
        const imgResp = yield axios(setupURI(data.image));
        const mimeType = imgResp.headers["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUrl,
            contract,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data.image,
                imageFormat: format,
                name: data.name,
                attributes: data.attributes,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_4 = error.response) === null || _4 === void 0 ? void 0 : _4.status) === 429 ? { errorStatus: 429 } : {})), (((_5 = error.response) === null || _5 === void 0 ? void 0 : _5.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0x691bd0f2f5a145fcf297cf4be79095b66f002cbc
export const Awokensages = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _6, _7;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const newUri = `https://api.crosspunks.com/cars/meta/2/${tokenId}`;
    const baseUrl = uri;
    try {
        const response = yield axios(newUri);
        const { data } = response;
        const imgResp = yield axios(setupURI(data.image));
        const mimeType = imgResp.headers["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: format,
                name: data.name,
                attributes: data.attributes,
                description: data.description,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_6 = error.response) === null || _6 === void 0 ? void 0 : _6.status) === 429 ? { errorStatus: 429 } : {})), (((_7 = error.response) === null || _7 === void 0 ? void 0 : _7.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0x7f3495cf2d05db6e9e52cdf989bced71e786725c
export const Technomaniacs = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _8, _9;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const newUri = `https://api.crosspunks.com/cars/meta/1/${tokenId}`;
    const baseUrl = uri;
    try {
        const response = yield axios(newUri);
        const { data } = response;
        const imgResp = yield axios(setupURI(data.image));
        const mimeType = imgResp.headers["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: format,
                name: data.name,
                attributes: data.attributes,
                description: data.description,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_8 = error.response) === null || _8 === void 0 ? void 0 : _8.status) === 429 ? { errorStatus: 429 } : {})), (((_9 = error.response) === null || _9 === void 0 ? void 0 : _9.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0xe7f8ccda432239dcb418e94d625bc2fe6350f6bb
export const ArcadeEdition = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _10, _11;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const newUri = `https://api.alturanft.com/meta/arcade-edition/${tokenId}`;
    try {
        const response = yield axios(newUri);
        const { data } = response;
        const mimeType = data.mime;
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: format,
                name: data.name,
                description: data.description,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_10 = error.response) === null || _10 === void 0 ? void 0 : _10.status) === 429 ? { errorStatus: 429 } : {})), (((_11 = error.response) === null || _11 === void 0 ? void 0 : _11.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0x56d93767467c54bd86578666904087c4f16cdb7f
export const Founders_Cabinet = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _12, _13;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const newUri = `https://api.alturanft.com/meta/chain-cade-founders-edition/${tokenId}`;
    const baseUrl = uri;
    try {
        const response = yield axios(newUri);
        const { data } = response;
        const mimeType = data.mime;
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: format,
                name: data.name,
                description: data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_12 = error.response) === null || _12 === void 0 ? void 0 : _12.status) === 429 ? { errorStatus: 429 } : {})), (((_13 = error.response) === null || _13 === void 0 ? void 0 : _13.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0x2d317ed6c2e3eb5c54ca7518ef19deee96c15c85
export const TTAV = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _14, _15;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = yield axios(url);
        const { headers } = yield axios(setupURI(data.image));
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
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
        return Object.assign(Object.assign(Object.assign({}, nft), (((_14 = error.response) === null || _14 === void 0 ? void 0 : _14.status) === 429 ? { errorStatus: 429 } : {})), (((_15 = error.response) === null || _15 === void 0 ? void 0 : _15.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0x7a7ca3b27760b52428d7a9d0a9f369ff31a2de94
export const BoredGUtterCats = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _16, _17;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const newUri = `https://ipfs.moralis.io:2053/ipfs/QmV4CkNpDsiF5hSaUCJZAndDo1gVM8zxTKMbpN8teyDoTv/${tokenId}.json`;
    try {
        const { data } = yield axios(newUri);
        const { headers } = yield axios(setupURI(data.image));
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            collectionIdent,
            owner: account,
            uri: newUri,
            contract,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: format,
                name: data.name,
                description: data.description,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_16 = error.response) === null || _16 === void 0 ? void 0 : _16.status) === 429 ? { errorStatus: 429 } : {})), (((_17 = error.response) === null || _17 === void 0 ? void 0 : _17.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0x2FeEE2Cc7fB32bD48AB22080e2C680f5390Ef426
export const IDoDirtPolygon = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _18, _19;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = yield axios(url);
        const { headers } = yield axios(setupURI(data.image));
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: format,
                attributes: data.attributes,
                description: data.description,
                name: data.name,
                contractType: "erc721",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_18 = error.response) === null || _18 === void 0 ? void 0 : _18.status) === 429 ? { errorStatus: 429 } : {})), (((_19 = error.response) === null || _19 === void 0 ? void 0 : _19.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0x2953399124f0cbb46d2cbacd8a89cf0599974963
export const ArsenalGame = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _20, _21;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    if (!uri)
        console.log("NFT with no uri collection: ", collectionIdent, "tokenId: ", tokenId);
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = yield axios(url);
        const { headers } = yield axios(setupURI(data.image));
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: format,
                animation_url: data.animation_url,
                animation_url_format: "mp4",
                description: data.description,
                name: data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_20 = error.response) === null || _20 === void 0 ? void 0 : _20.status) === 429 ? { errorStatus: 429 } : {})), (((_21 = error.response) === null || _21 === void 0 ? void 0 : _21.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! 0xc69ecd37122a9b5fd7e62bc229d478bb83063c9d
export const Mate = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _22, _23, _24;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = yield axios(url);
        const imgResp = yield axios(setupURI(data.image));
        const mimeType = (_22 = imgResp === null || imgResp === void 0 ? void 0 : imgResp.headers) === null || _22 === void 0 ? void 0 : _22["content-type"];
        const format = mimeType.slice(mimeType.lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.animation_url),
                imageFormat: format,
                attributes: data.attributes,
                description: data.description,
                name: data.name,
                symbol: imgResp.data.symbol,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_23 = error.response) === null || _23 === void 0 ? void 0 : _23.status) === 429 ? { errorStatus: 429 } : {})), (((_24 = error.response) === null || _24 === void 0 ? void 0 : _24.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
export const CoolPig = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = yield axios(url);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: `https://img.tofunft.com/v2/1666600000/0x09d9d1aff7b40916236966cde92023af770e78bb/${tokenId}/280/image.jpg`,
                imageFormat: "jpg",
                attributes: data.attributes,
                description: data.description,
                name: data.name,
                collectionName: "Cool Pigs NFT",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error.code);
        return nft;
    }
});
// ! 0x8eaeaa3a67abfc7c141775234fc30c707e26cf49
// ! ABCBears
export const ABCBears = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    if (!uri)
        console.log("NFT with no uri collection: ", collectionIdent, "tokenId: ", tokenId);
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = yield axios(url);
        const { headers } = yield axios(setupURI(data.image));
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: format,
                animation_url: data.animation_url,
                animation_url_format: "mp4",
                description: data.description,
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
// ! 0x51ecb52ebb85384679b108a9e6a017ae17754eef
// ! Tragic Monsters
export const TragicMonsters = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    if (!uri)
        console.log("NFT with no uri collection: ", collectionIdent, "tokenId: ", tokenId);
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = yield axios(url);
        const { headers } = yield axios(setupURI(data.image));
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: format,
                description: data.description,
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
// ! 0xbede8ad4878e5ce441accce6a828ea7bc5be1ed0
// ! Super Fat Academy NFT
export const SuperFatAcademy = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    if (!uri)
        console.log("NFT with no uri collection: ", collectionIdent, "tokenId: ", tokenId);
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const { data } = yield axios(url);
        const { headers } = yield axios(setupURI(data.image));
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: format,
                description: data.description,
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
// ! 0xb94c3fd0016888bab09dbc229f9397294e828a54
// ! Forgotten Runes Comic
export const ForgottenRunesComic = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data } = response;
        const { headers } = yield axios(`${proxy}${setupURI(data.image)}`);
        const video = headers["content-type"].includes("video");
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: "",
                imageFormat: "",
                animation_url: setupURI(data.image),
                animation_url_format: format,
                attributes: data.attributes,
                description: data.description,
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
// ! 0xd4c77e46b0266a7aca11083bcc86342f47bbdd04
// ! LilDickie
export const LilDickie = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data } = response;
        const { headers } = yield axios(`${proxy}${setupURI(data.image)}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
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
        return nft;
    }
});
// ! 0x9304f22a5ab577119210d730e41755a6732e19f7
// ! TheCheeks
export const TheCheeks = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data } = response;
        const { headers } = yield axios(`${proxy}${setupURI(data.image)}`);
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
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
        return nft;
    }
});
// ! 0x028faf7eab0d8abb4a2d784206bfa98979041ffc
// ! Interesting CPeople
export const InterestingCPeople = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: "png",
                attributes: data.attributes,
                description: data.description,
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
export const Nagato = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _25;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = proxy
            ? (yield pool.addRequest(url))
            : yield axios(url);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data
                    ? setupURI(data.image)
                    : `https://ipfs-nft-storage.com/ipfs/velasnagato/${tokenId}.png`,
                imageFormat: "png",
                attributes: data && data.attributes,
                description: data && data.description,
                name: data ? data.name : `Nagato #${tokenId}`,
            },
        };
        return nft;
    }
    catch (error) {
        return Object.assign(Object.assign({}, nft), (((_25 = error.response) === null || _25 === void 0 ? void 0 : _25.status) === 429 ? { errorStatus: 429 } : {}));
    }
});
export const OpenSEA = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield axios(`${proxy}${uri.replace("0x{id}", tokenId)}`);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data.image,
                imageFormat: "png",
                attributes: data && data.attributes,
                description: data && data.description,
                animation_url: data.animation_url,
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
export const ChainCaders = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _26, _27, _28, _29, _30, _31, _32;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield axios(`${proxy}https://api.alturanft.com/api/item/56/${collectionIdent}/${tokenId}`);
        const { data } = response;
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
                image: (_26 = data === null || data === void 0 ? void 0 : data.item) === null || _26 === void 0 ? void 0 : _26.imageUrl,
                imageFormat: (_28 = (_27 = data === null || data === void 0 ? void 0 : data.item) === null || _27 === void 0 ? void 0 : _27.imageUrl) === null || _28 === void 0 ? void 0 : _28.match(/(?:\.([^.]+))?$/)[1],
                name: (_29 = data === null || data === void 0 ? void 0 : data.item) === null || _29 === void 0 ? void 0 : _29.name,
                description: (_30 = data === null || data === void 0 ? void 0 : data.item) === null || _30 === void 0 ? void 0 : _30.description,
                collectionName: (_31 = data === null || data === void 0 ? void 0 : data.item) === null || _31 === void 0 ? void 0 : _31.collectionName,
                attributes: (_32 = data === null || data === void 0 ? void 0 : data.item) === null || _32 === void 0 ? void 0 : _32.properties,
                contractType: "1155",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
export const OPENSTORE = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId, contractType }, collectionIdent, uri, } = nft;
    try {
        const response = yield axios(contractType === "ERC1155"
            ? `${proxy}https://api.opensea.io/api/v2/metadata/matic/0x2953399124F0cBB46d2CbACD8A89cF0599974963/${tokenId}`
            : `${proxy}${uri.replace(/:\d+/, "").replace(".moralis", "")}`);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data && setupURI(data.image_url || data.image),
                imageFormat: "png",
                description: data && data.description,
                animation_url: data && data.animation_url,
                name: data && data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
export const COZYCOSM = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const res = yield axios(setupURI(uri));
        const { data } = res;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: "png",
                name: data.name,
                description: data.description,
                attributes: data.attributes,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
export const DirtyLife = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield axios(`${proxy}${uri}`).catch(() => ({
            data: null,
        }));
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
                collectionName: "DirtLife",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
export const MachineFi = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        console.log("here");
        const data = JSON.parse(uri);
        console.log(data);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data && data.image,
                imageFormat: "gif",
                description: data && data.description,
                name: data && data.name,
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
export const TRSRNFT = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _33, _34, _35;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield axios(`${proxy}${uri}`).catch(() => ({
            data: null,
        }));
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data && ((_33 = data.data) === null || _33 === void 0 ? void 0 : _33.image),
                imageFormat: "png",
                description: data && ((_34 = data.data) === null || _34 === void 0 ? void 0 : _34.description),
                name: data && ((_35 = data.data) === null || _35 === void 0 ? void 0 : _35.name),
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
//WUBI
export const WUBI = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _36;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = proxy
            ? (yield pool.addRequest(proxy + uri))
            : yield axios(uri);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data && setupURI(data === null || data === void 0 ? void 0 : data.image),
                imageFormat: "png",
                description: data && (data === null || data === void 0 ? void 0 : data.description),
                name: data && (data === null || data === void 0 ? void 0 : data.name),
            },
        };
        return nft;
    }
    catch (error) {
        return Object.assign(Object.assign({}, nft), (((_36 = error.response) === null || _36 === void 0 ? void 0 : _36.status) === 429 ? { errorStatus: 429 } : {}));
    }
});
export const PACK = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield axios(`${proxy}${uri}`).catch(() => ({
            data: null,
        }));
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: "png",
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
export const VelasOgPunks = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _37, _38;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = yield axios(uri);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: setupURI(data.image),
                imageFormat: "png",
                description: data.description,
                name: data.name,
                symbol: data.symbol || "PUNK",
                attributes: data.attributes,
                contractType: data.type || "721",
                collectionName: "VelasOGPunks",
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return Object.assign(Object.assign(Object.assign({}, nft), (((_37 = error.response) === null || _37 === void 0 ? void 0 : _37.status) === 429 ? { errorStatus: 429 } : {})), (((_38 = error.response) === null || _38 === void 0 ? void 0 : _38.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
export const Drifters = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _39;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = proxy
            ? (yield pool.addRequest(proxy + uri))
            : yield axios(uri);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: `https://drifters-nft.s3.amazonaws.com/${tokenId}.png`,
                imageFormat: "png",
                description: data === null || data === void 0 ? void 0 : data.description,
                name: data === null || data === void 0 ? void 0 : data.name,
                symbol: (data === null || data === void 0 ? void 0 : data.symbol) || "DRIFTER",
                attributes: data === null || data === void 0 ? void 0 : data.attributes,
                contractType: (data === null || data === void 0 ? void 0 : data.type) || "721",
                collectionName: "Drifters",
            },
        };
        return nft;
    }
    catch (error) {
        return Object.assign(Object.assign({}, nft), (((_39 = error.response) === null || _39 === void 0 ? void 0 : _39.status) === 429 ? { errorStatus: 429 } : {}));
    }
});
export const Weed = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _40;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    if (proxy)
        return nft;
    try {
        const response = yield axios(uri);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            forceCache: true,
            metaData: {
                whitelisted,
                image: `https://nft.weedcommerce.info/metadata/${tokenId}.png`,
                imageFormat: "png",
                description: data === null || data === void 0 ? void 0 : data.description,
                name: data === null || data === void 0 ? void 0 : data.name,
                symbol: (data === null || data === void 0 ? void 0 : data.symbol) || "EOTM",
                attributes: data === null || data === void 0 ? void 0 : data.attributes,
                collectionName: "Employees of the Metaverse",
            },
        };
        return nft;
    }
    catch (error) {
        return Object.assign(Object.assign({}, nft), (((_40 = error.response) === null || _40 === void 0 ? void 0 : _40.status) === 429 ? { errorStatus: 429 } : {}));
    }
});
export const Cities = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _41;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const response = proxy
            ? (yield pool.addRequest(proxy + uri))
            : yield axios(uri);
        const { data } = response;
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data.wrapped,
            metaData: {
                whitelisted,
                image: data && setupURI(data.image),
                imageFormat: "png",
                description: data && data.description,
                name: data && data.name,
                symbol: (data && data.symbol) || "CFOD",
                attributes: data && data.attributes,
                contractType: (data && data.type) || "721",
                collectionName: "Cities From Our Dreams",
            },
        };
        return nft;
    }
    catch (error) {
        return Object.assign(Object.assign({}, nft), (((_41 = error.response) === null || _41 === void 0 ? void 0 : _41.status) === 429 ? { errorStatus: 429 } : {}));
    }
});
export const Mountains = Cities;
export const WrappedXPNET = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        let { data } = yield axios(`${proxy}${uri}`).catch(() => ({
            data: null,
        }));
        data = yield checkEmptyFromTezos(data);
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: data && data && data.wrapped,
            metaData: {
                whitelisted,
                image: data && setupURI(data.image),
                imageFormat: "png",
                description: data && (data === null || data === void 0 ? void 0 : data.description),
                name: data && (data === null || data === void 0 ? void 0 : data.name),
                attributes: data && (data === null || data === void 0 ? void 0 : data.attributes),
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
//!0x34933A5958378e7141AA2305Cdb5cDf514896035
export const abeyChainUserMinter = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield axios(`${proxy}${setupURI(uri)}`).catch(() => ({
            data: null,
        }));
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
                imageFormat: "png",
                description: data && (data === null || data === void 0 ? void 0 : data.description),
                name: data && (data === null || data === void 0 ? void 0 : data.name),
                attributes: data && (data === null || data === void 0 ? void 0 : data.attributes),
            },
        };
        return nft;
    }
    catch (error) {
        console.error(error);
        return nft;
    }
});
export const RCM = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield axios(`${proxy}${setupURI(uri)}`).catch(() => ({
            data: null,
        }));
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
                image: data === null || data === void 0 ? void 0 : data.image,
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
export const AbeyDefault = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const newURI = `https://metadata.fantase.io/${collectionIdent.toLowerCase()}/metadata/json/${tokenId}.json`;
    try {
        const { data } = yield axios(`${proxy}${newURI}`).catch(() => ({
            data: null,
        }));
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri: newURI,
            contract,
            collectionIdent,
            metaData: {
                whitelisted,
                image: data === null || data === void 0 ? void 0 : data.image,
                imageFormat: "jpg",
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
export const moonbeamDefault = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const { data } = yield axios(`${proxy}${uri}`).catch(() => ({
            data: null,
        }));
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
                image: data === null || data === void 0 ? void 0 : data.image,
                imageFormat: "jpg",
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
export const grandWings = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    try {
        const from = uri.indexOf("/ipfs/");
        const str = uri.slice(from);
        const newUri = `${proxy}https://ipfs.io${str}`;
        const { data } = yield axios(`${proxy}${newUri}`).catch(() => ({
            data: null,
        }));
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
                image: data === null || data === void 0 ? void 0 : data.image.replace("ipfs://", "https://ipfs.io/"),
                imageFormat: "jpeg",
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
