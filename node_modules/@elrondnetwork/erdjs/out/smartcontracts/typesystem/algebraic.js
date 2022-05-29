"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalValue = exports.OptionalType = void 0;
const utils_1 = require("../../utils");
const types_1 = require("./types");
/**
 * An optional is an algebraic type. It holds zero or one values.
 */
class OptionalType extends types_1.Type {
    constructor(typeParameter) {
        super("Optional", [typeParameter], types_1.TypeCardinality.variable(1));
    }
    getClassName() {
        return OptionalType.ClassName;
    }
    isAssignableFrom(type) {
        if (!(type.hasExactClass(OptionalType.ClassName))) {
            return false;
        }
        let invariantTypeParameters = this.getFirstTypeParameter().equals(type.getFirstTypeParameter());
        let fakeCovarianceToNull = type.getFirstTypeParameter().hasExactClass(types_1.NullType.ClassName);
        return invariantTypeParameters || fakeCovarianceToNull;
    }
}
exports.OptionalType = OptionalType;
OptionalType.ClassName = "OptionalType";
class OptionalValue extends types_1.TypedValue {
    constructor(type, value = null) {
        super(type);
        // TODO: assert value is of type type.getFirstTypeParameter()
        this.value = value;
    }
    getClassName() {
        return OptionalValue.ClassName;
    }
    /**
     * Creates an OptionalValue, as not provided (missing).
     */
    static newMissing() {
        let type = new OptionalType(new types_1.NullType());
        return new OptionalValue(type);
    }
    isSet() {
        return this.value ? true : false;
    }
    getTypedValue() {
        utils_1.guardValueIsSet("value", this.value);
        return this.value;
    }
    valueOf() {
        return this.value ? this.value.valueOf() : null;
    }
    equals(other) {
        var _a;
        return ((_a = this.value) === null || _a === void 0 ? void 0 : _a.equals(other.value)) || false;
    }
}
exports.OptionalValue = OptionalValue;
OptionalValue.ClassName = "OptionalValue";
//# sourceMappingURL=algebraic.js.map