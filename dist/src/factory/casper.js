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
exports.casperParser = void 0;
const axios_1 = __importDefault(require("axios"));
const casperParser = (collectionIdent, nft, account, whitelisted) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("casper nft parser");
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";
    switch (collectionIdent) {
        default: {
            let uri = nft.uri;
            if (uri) {
                let res;
                try {
                    res = yield (0, axios_1.default)(nft.uri);
                }
                catch (error) {
                    res = yield axios_1.default.get(nft.uri, {
                        headers: {
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
                        },
                    });
                }
                const contentType = res.headers["content-type"];
                process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "1";
                if (typeof res.data === "object") {
                    return Object.assign(Object.assign({}, nft), { metaData: {
                            name: res.data.name,
                            image: res.data.image,
                            description: res.data.description,
                            collectionName: nft.collectionIdent,
                            attributes: res.data.attributes,
                        } });
                }
                else {
                    return Object.assign(Object.assign({}, nft), { metaData: {
                            image: contentType.includes("image") ? nft.uri : "",
                            animation_url: contentType.includes("video") ? nft.uri : ""
                        } });
                }
            }
        }
    }
});
exports.casperParser = casperParser;
