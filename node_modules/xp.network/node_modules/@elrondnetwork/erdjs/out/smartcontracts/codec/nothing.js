"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NothingCodec = void 0;
const typesystem_1 = require("../typesystem");
class NothingCodec {
    decodeNested() {
        return [new typesystem_1.NothingValue(), 0];
    }
    decodeTopLevel() {
        return new typesystem_1.NothingValue();
    }
    encodeNested() {
        return Buffer.from([]);
    }
    encodeTopLevel() {
        return Buffer.from([]);
    }
}
exports.NothingCodec = NothingCodec;
//# sourceMappingURL=nothing.js.map