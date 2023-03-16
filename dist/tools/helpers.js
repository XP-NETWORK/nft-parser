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
import { setupURI } from "../src/factory";
import { proxy } from "../src";
import { fromBuffer } from "file-type";
export const getWrappedNft = (nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { native, native: { contract, tokenId, chainId }, collectionIdent, uri, } = nft;
    const res = yield axios(`https://nft.xp.network/w/${tokenId}`);
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
            image: setupURI(data === null || data === void 0 ? void 0 : data.image),
            imageFormat: (_a = data === null || data === void 0 ? void 0 : data.image) === null || _a === void 0 ? void 0 : _a.match(/(?:\.([^.]+))?$/)[1],
            attributes: data === null || data === void 0 ? void 0 : data.attributes,
            description: data === null || data === void 0 ? void 0 : data.description,
            name: data === null || data === void 0 ? void 0 : data.name,
        },
    };
});
export const getAssetFormat = (imageUri) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!imageUri) {
        throw new Error("no url:");
    }
    let format = "";
    try {
        if (/(\.png$|\.jpe?g$|\.gif$|\.mp4$|\.avi$|\.webm$|\.svg$)/.test(imageUri)) {
            format = ((_b = imageUri.match(/(?:\.([^.]+))?$/)) === null || _b === void 0 ? void 0 : _b.at(1)) || "";
        }
        else {
            if (proxy) {
                const { headers } = yield axios(`${proxy}${setupURI(imageUri)}`);
                format = headers["content-type"].slice(headers["content-type"].lastIndexOf("/") + 1);
            }
            else {
                format = yield new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                    var _c;
                    const stream = yield tryPinataWrapper((url) => axios.get(url, {
                        responseType: "stream",
                        timeout: 3000,
                    }))(setupURI(imageUri)).catch((e) => reject(e));
                    (_c = stream === null || stream === void 0 ? void 0 : stream.data) === null || _c === void 0 ? void 0 : _c.on("data", (chunk) => __awaiter(void 0, void 0, void 0, function* () {
                        var _d;
                        const res = yield fromBuffer(chunk).catch((e) => reject(e));
                        (_d = stream === null || stream === void 0 ? void 0 : stream.data) === null || _d === void 0 ? void 0 : _d.destroy();
                        if ((res === null || res === void 0 ? void 0 : res.ext) === "heic")
                            return reject("heic format");
                        resolve((res === null || res === void 0 ? void 0 : res.ext) || "");
                    }));
                }));
            }
        }
        return format;
    }
    catch (e) {
        console.log(e.message, "reading format");
        throw e;
    }
});
export const tryPinataWrapper = (cb) => (url) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cb(proxy + url).catch((e) => {
        var _a;
        if (((_a = e.message) === null || _a === void 0 ? void 0 : _a.includes("429")) && /^https:\/\/ipfs.io/.test(url)) {
            return cb(proxy +
                url.replace(/^https:\/\/ipfs.io/, "https://gateway.pinata.cloud"));
        }
        throw e;
    });
});
