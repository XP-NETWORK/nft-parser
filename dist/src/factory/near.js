var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as evm from './index';
export const nearParser = (collectionIdent, nft, account, whitelisted, chainId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let parsed;
    switch (collectionIdent) {
        default: {
            if (nft.uri) {
                parsed = yield evm.Default(nft, account, whitelisted);
            }
            else {
                parsed = Object.assign(Object.assign({}, nft), { metaData: {
                        name: nft.title,
                        description: nft.description,
                        image: nft.image,
                        imageFormat: ((_b = (_a = nft.image) === null || _a === void 0 ? void 0 : _a.match(/(?:\.([^.]+))?$/)) === null || _b === void 0 ? void 0 : _b.at(1)) || "",
                        collectionName: nft.collectionIdent,
                        attributes: nft.attributes
                    } });
            }
            break;
        }
    }
    return parsed;
});
