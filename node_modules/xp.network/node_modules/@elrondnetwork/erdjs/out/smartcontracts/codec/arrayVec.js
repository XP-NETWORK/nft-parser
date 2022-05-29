"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayVecBinaryCodec = void 0;
const typesystem_1 = require("../typesystem");
class ArrayVecBinaryCodec {
    constructor(binaryCodec) {
        this.binaryCodec = binaryCodec;
    }
    decodeNested(buffer, type) {
        let arrayLength = type.length;
        let typeParameter = type.getFirstTypeParameter();
        let result = [];
        let totalLength = 0;
        for (let i = 0; i < arrayLength; i++) {
            let [decoded, decodedLength] = this.binaryCodec.decodeNested(buffer, typeParameter);
            result.push(decoded);
            totalLength += decodedLength;
            buffer = buffer.slice(decodedLength);
        }
        return [new typesystem_1.ArrayVec(type, result), totalLength];
    }
    decodeTopLevel(buffer, type) {
        let [result, _] = this.decodeNested(buffer, type);
        return result;
    }
    encodeNested(array) {
        let itemsBuffers = [];
        for (const item of array.getItems()) {
            let itemBuffer = this.binaryCodec.encodeNested(item);
            itemsBuffers.push(itemBuffer);
        }
        return Buffer.concat(itemsBuffers);
    }
    encodeTopLevel(array) {
        return this.encodeNested(array);
    }
}
exports.ArrayVecBinaryCodec = ArrayVecBinaryCodec;
//# sourceMappingURL=arrayVec.js.map