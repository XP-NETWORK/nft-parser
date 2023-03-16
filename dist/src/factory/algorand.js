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
import { getAssetFormat } from "..";
import { setupURI } from ".";
import { proxy } from "..";
export const algorandParser = (collectionIdent, nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    switch (true) {
        case collectionIdent.includes("D00dles"):
            collectionIdent = "D00dles";
            break;
        case collectionIdent.includes("Donkey"):
            collectionIdent = "Donkey";
            break;
        case collectionIdent.includes("Algo Rocket"):
            collectionIdent = "Algo Rocket";
            break;
        case collectionIdent.includes("ALGO WEIRD AXEL"):
            collectionIdent = "ALGO WEIRD AXEL";
            break;
        case collectionIdent.includes("Warrior Croc"):
            collectionIdent = "Warrior Croc";
            break;
        case collectionIdent.includes("Al Goanna"):
            collectionIdent = "Al Goanna";
            break;
        case collectionIdent.includes("BrontosEYE"):
            collectionIdent = "BrontosEYE";
            break;
        case collectionIdent.includes("Shep"):
            collectionIdent = "Shep";
            break;
        case collectionIdent.includes("RaptorEYE"):
            collectionIdent = "RaptorEYE";
            break;
        case collectionIdent.includes("The Psychedelic Forest"):
            collectionIdent = "The Psychedelic Forest";
            break;
        case collectionIdent.includes("Dead Putin Society"):
            collectionIdent = "Dead Putin Society";
            break;
        case collectionIdent.includes("AlgoSeas Pirate"):
            collectionIdent = "AlgoSeas Pirate";
            break;
        case collectionIdent.includes("Alchemon"):
            collectionIdent = "Alchemon";
            break;
        case collectionIdent.includes("SMC"):
            collectionIdent = "SMC";
            break;
        case collectionIdent.includes("C.B.C.G"):
            collectionIdent = "C.B.C.G";
            break;
        //C.B.C.G
        default:
            break;
    }
    let parsed;
    switch (collectionIdent) {
        case "D00dles":
            parsed = yield LikeD00dles(nft, account, whitelisted);
            break;
        case "Donkey":
            parsed = yield LikeD00dles(nft, account, whitelisted);
            break;
        case "Algo Rocket":
            parsed = yield LikeD00dles(nft, account, whitelisted);
            break;
        case "ALGO WEIRD AXEL":
            parsed = yield LikeD00dles(nft, account, whitelisted);
            break;
        case "Warrior Croc":
            parsed = yield WarriorCroc(nft, account, whitelisted);
            break;
        case "Al Goanna":
            parsed = yield LikeD00dles(nft, account, whitelisted);
            break;
        case "BrontosEYE":
            parsed = yield LikeD00dles(nft, account, whitelisted);
            break;
        case "Number 512":
            parsed = yield LikeD00dles(nft, account, whitelisted);
            break;
        case "Shep":
            parsed = yield LikeD00dles(nft, account, whitelisted);
            break;
        case "The Psychedelic Forest":
            parsed = yield LikeD00dles(nft, account, whitelisted);
            break;
        case "RaptorEYE":
            parsed = yield LikeD00dles(nft, account, whitelisted);
            break;
        case "Dead Putin Society":
            parsed = yield LikeD00dles(nft, account, whitelisted);
            break;
        case "LION'S BEAUTY":
            parsed = yield LikeD00dles(nft, account, whitelisted);
            break;
        case "Floating ghost":
            parsed = yield LikeD00dles(nft, account, whitelisted);
            break;
        case "AlgoSeas Pirate":
            parsed = yield LikeD00dles(nft, account, whitelisted);
            break;
        case "Alchemon":
            parsed = yield Alchemon(nft, account, whitelisted);
            break;
        case "SMC":
            parsed = yield SMC(nft, account, whitelisted);
            break;
        case "C.B.C.G":
            parsed = yield CBCG(nft, account, whitelisted);
            break;
        case "Bozeman Mountaineers JMFL":
            parsed = yield Bozeman(nft, account, whitelisted);
            break;
        default:
            parsed = yield Default(nft, account, whitelisted);
            break;
    }
    return parsed;
});
// ! COLLECTIONS
// ! Default
export const Default = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { native, native: { contract, tokenId, chainId, name }, collectionIdent, uri, } = nft;
    try {
        const [json, foramt] = yield Promise.all([
            axios(proxy + `https://api.algoxnft.com/v1/assets/${tokenId}`),
            getAssetFormat(setupURI(uri)),
        ]);
        const { data } = json;
        return {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: null,
            metaData: {
                whitelisted,
                image: setupURI(uri),
                imageFormat: foramt,
                name: (data === null || data === void 0 ? void 0 : data.name) || name,
                collectionName: (data === null || data === void 0 ? void 0 : data.collection_name) || name.split("#")[0].trim(),
                attributes: (_a = data === null || data === void 0 ? void 0 : data.arc69_data) === null || _a === void 0 ? void 0 : _a.attributes,
                description: data === null || data === void 0 ? void 0 : data.collection_description
            },
        };
    }
    catch (error) {
        return Object.assign(Object.assign({}, nft), (((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) === 404 ? { errorStatus: 404 } : {}));
    }
});
// ! "D00dles"
export const LikeD00dles = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data, headers } = response;
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
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
                image: setupURI(url),
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
// ! Warrior Croc
export const WarriorCroc = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    // debugger;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data } = response;
        const format = data["image_mime_type"].slice(data["image_mime_type"].lastIndexOf("/") + 1);
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
// ! Alchemon
export const Alchemon = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const baseUrl = uri;
    const url = `${proxy}${setupURI(uri)}`;
    try {
        const response = yield axios(url);
        const { data, headers } = response;
        const format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
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
                image: "",
                imageFormat: "",
                animation_url: setupURI(uri),
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
export const SMC = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId, name }, collectionIdent, uri, } = nft;
    const [attrs, foramt] = yield Promise.all([
        axios(proxy + `https://api.algoxnft.com/v1/assets/${tokenId}/arc69`),
        getAssetFormat(setupURI(uri)),
    ]);
    const { data } = attrs;
    try {
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: null,
            metaData: {
                whitelisted,
                image: setupURI(uri),
                imageFormat: foramt,
                name,
                symbol: "SMC",
                collectionName: "SMC",
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
export const CBCG = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId, name }, collectionIdent, uri, } = nft;
    /* const attrs = await axios(
      proxy + `https://api.algoxnft.com/v1/assets/${tokenId}/arc69`
    );*/
    const [attrs, foramt] = yield Promise.all([
        axios(proxy + `https://api.algoxnft.com/v1/assets/${tokenId}/arc69`),
        getAssetFormat(setupURI(uri)),
    ]);
    const { data } = attrs;
    try {
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: null,
            metaData: {
                whitelisted,
                image: setupURI(uri),
                imageFormat: foramt,
                name,
                symbol: "C.B.C.G",
                collectionName: "C.B.C.G",
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
export const Bozeman = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    const { native, native: { contract, tokenId, chainId, name }, collectionIdent, uri, } = nft;
    /* const attrs = await axios(
      proxy + `https://api.algoxnft.com/v1/assets/${tokenId}/arc69`
    );*/
    const [attrs, foramt] = yield Promise.all([
        axios(proxy + `https://api.algoxnft.com/v1/assets/${tokenId}/arc69`),
        getAssetFormat(setupURI(uri)),
    ]);
    const { data } = attrs;
    try {
        const nft = {
            native,
            chainId,
            tokenId,
            owner: account,
            uri,
            contract,
            collectionIdent,
            wrapped: null,
            metaData: {
                whitelisted,
                image: setupURI(uri),
                imageFormat: foramt,
                name,
                //symbol: "Bozeman Mountaineers JMFL",
                collectionName: "Bozeman Mountaineers JMFL",
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
