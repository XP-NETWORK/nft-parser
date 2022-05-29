"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.H256Value = exports.H256Type = void 0;
const types_1 = require("./types");
class H256Type extends types_1.PrimitiveType {
    constructor() {
        super("H256");
    }
    getClassName() {
        return H256Type.ClassName;
    }
}
exports.H256Type = H256Type;
H256Type.ClassName = "H256Type";
class H256Value extends types_1.PrimitiveValue {
    constructor(value) {
        super(new H256Type());
        this.value = value;
    }
    getClassName() {
        return H256Value.ClassName;
    }
    /**
     * Returns whether two objects have the same value.
     */
    equals(other) {
        return this.value.equals(other.value);
    }
    valueOf() {
        return this.value;
    }
}
exports.H256Value = H256Value;
H256Value.ClassName = "H256Value";
//# sourceMappingURL=h256.js.map