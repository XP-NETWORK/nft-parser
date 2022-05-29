"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringBinaryCodec = void 0;
const typesystem_1 = require("../typesystem");
const bytes_1 = require("../typesystem/bytes");
const bytes_2 = require("./bytes");
class StringBinaryCodec {
    constructor() {
        this.bytesBinaryCodec = new bytes_2.BytesBinaryCodec();
    }
    decodeNested(buffer) {
        let [decoded, length] = this.bytesBinaryCodec.decodeNested(buffer);
        let decodedAsString = new typesystem_1.StringValue(decoded.valueOf().toString());
        return [decodedAsString, length];
    }
    decodeTopLevel(buffer) {
        return new typesystem_1.StringValue(buffer.toString());
    }
    encodeNested(value) {
        let valueAsBytes = bytes_1.BytesValue.fromUTF8(value.valueOf());
        return this.bytesBinaryCodec.encodeNested(valueAsBytes);
    }
    encodeTopLevel(value) {
        return Buffer.from(value.valueOf());
    }
}
exports.StringBinaryCodec = StringBinaryCodec;
//# sourceMappingURL=string.js.map