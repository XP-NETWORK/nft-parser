"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumBinaryCodec = void 0;
const typesystem_1 = require("../typesystem");
const fields_1 = require("./fields");
class EnumBinaryCodec {
    constructor(binaryCodec) {
        this.binaryCodec = binaryCodec;
        this.fieldsCodec = new fields_1.FieldsBinaryCodec(binaryCodec);
    }
    decodeTopLevel(buffer, type) {
        // This handles enums without fields, with discriminant = 0, as well.
        let [enumValue] = this.decodeNested(buffer, type);
        return enumValue;
    }
    decodeNested(buffer, type) {
        let [discriminant, lengthOfDiscriminant] = this.readDiscriminant(buffer);
        buffer = buffer.slice(lengthOfDiscriminant);
        let variant = type.getVariantByDiscriminant(discriminant);
        let fieldDefinitions = variant.getFieldsDefinitions();
        let [fields, lengthOfFields] = this.fieldsCodec.decodeNested(buffer, fieldDefinitions);
        let enumValue = new typesystem_1.EnumValue(type, variant, fields);
        return [enumValue, lengthOfDiscriminant + lengthOfFields];
    }
    readDiscriminant(buffer) {
        let [value, length] = this.binaryCodec.decodeNested(buffer, new typesystem_1.U8Type());
        let discriminant = value.valueOf();
        return [discriminant, length];
    }
    encodeNested(enumValue) {
        let discriminant = new typesystem_1.U8Value(enumValue.discriminant);
        let discriminantBuffer = this.binaryCodec.encodeNested(discriminant);
        let fields = enumValue.getFields();
        let fieldsBuffer = this.fieldsCodec.encodeNested(fields);
        return Buffer.concat([discriminantBuffer, fieldsBuffer]);
    }
    encodeTopLevel(enumValue) {
        let fields = enumValue.getFields();
        let hasFields = fields.length > 0;
        let fieldsBuffer = this.fieldsCodec.encodeNested(fields);
        let discriminant = new typesystem_1.U8Value(enumValue.discriminant);
        let discriminantBuffer = hasFields ? this.binaryCodec.encodeNested(discriminant) : this.binaryCodec.encodeTopLevel(discriminant);
        return Buffer.concat([discriminantBuffer, fieldsBuffer]);
    }
}
exports.EnumBinaryCodec = EnumBinaryCodec;
//# sourceMappingURL=enum.js.map