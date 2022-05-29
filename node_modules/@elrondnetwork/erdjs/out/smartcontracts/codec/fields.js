"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsBinaryCodec = void 0;
const typesystem_1 = require("../typesystem");
class FieldsBinaryCodec {
    constructor(binaryCodec) {
        this.binaryCodec = binaryCodec;
    }
    decodeNested(buffer, fieldDefinitions) {
        let fields = [];
        let totalLength = 0;
        for (const fieldDefinition of fieldDefinitions) {
            let [decoded, decodedLength] = this.binaryCodec.decodeNested(buffer, fieldDefinition.type);
            buffer = buffer.slice(decodedLength);
            totalLength += decodedLength;
            let field = new typesystem_1.Field(decoded, fieldDefinition.name);
            fields.push(field);
        }
        return [fields, totalLength];
    }
    encodeNested(fields) {
        let buffers = [];
        for (const field of fields) {
            let fieldBuffer = this.binaryCodec.encodeNested(field.value);
            buffers.push(fieldBuffer);
        }
        return Buffer.concat(buffers);
    }
}
exports.FieldsBinaryCodec = FieldsBinaryCodec;
//# sourceMappingURL=fields.js.map