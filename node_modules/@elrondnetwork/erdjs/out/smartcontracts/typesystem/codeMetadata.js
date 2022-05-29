"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeMetadataValue = exports.CodeMetadataType = void 0;
const types_1 = require("./types");
class CodeMetadataType extends types_1.PrimitiveType {
    constructor() {
        super("CodeMetadata");
    }
}
exports.CodeMetadataType = CodeMetadataType;
class CodeMetadataValue extends types_1.PrimitiveValue {
    constructor(value) {
        super(new CodeMetadataType());
        this.value = value;
    }
    equals(other) {
        return this.value.equals(other.value);
    }
    valueOf() {
        return this.value;
    }
}
exports.CodeMetadataValue = CodeMetadataValue;
//# sourceMappingURL=codeMetadata.js.map