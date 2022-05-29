"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructBinaryCodec = void 0;
const typesystem_1 = require("../typesystem");
const fields_1 = require("./fields");
class StructBinaryCodec {
    constructor(binaryCodec) {
        this.fieldsCodec = new fields_1.FieldsBinaryCodec(binaryCodec);
    }
    decodeTopLevel(buffer, type) {
        let [decoded] = this.decodeNested(buffer, type);
        return decoded;
    }
    decodeNested(buffer, type) {
        let fieldDefinitions = type.getFieldsDefinitions();
        let [fields, offset] = this.fieldsCodec.decodeNested(buffer, fieldDefinitions);
        let struct = new typesystem_1.Struct(type, fields);
        return [struct, offset];
    }
    encodeNested(struct) {
        let fields = struct.getFields();
        let buffer = this.fieldsCodec.encodeNested(fields);
        return buffer;
    }
    encodeTopLevel(struct) {
        return this.encodeNested(struct);
    }
}
exports.StructBinaryCodec = StructBinaryCodec;
//# sourceMappingURL=struct.js.map