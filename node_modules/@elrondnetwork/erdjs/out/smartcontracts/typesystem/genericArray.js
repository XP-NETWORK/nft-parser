"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayVec = exports.ArrayVecType = void 0;
const utils_1 = require("../../utils");
const collections_1 = require("./collections");
const types_1 = require("./types");
// A type for known-length arrays. E.g. "array20", "array32", "array64" etc.
class ArrayVecType extends types_1.Type {
    constructor(length, typeParameter) {
        super("Array", [typeParameter]);
        utils_1.guardTrue(length > 0, "array length > 0");
        this.length = length;
    }
    getClassName() {
        return ArrayVecType.ClassName;
    }
}
exports.ArrayVecType = ArrayVecType;
ArrayVecType.ClassName = "ArrayVecType";
class ArrayVec extends types_1.TypedValue {
    constructor(type, items) {
        super(type);
        utils_1.guardLength(items, type.length);
        this.backingCollection = new collections_1.CollectionOfTypedValues(items);
    }
    getClassName() {
        return ArrayVec.ClassName;
    }
    getLength() {
        return this.backingCollection.getLength();
    }
    getItems() {
        return this.backingCollection.getItems();
    }
    valueOf() {
        return this.backingCollection.valueOf();
    }
    equals(other) {
        return this.backingCollection.equals(other.backingCollection);
    }
}
exports.ArrayVec = ArrayVec;
ArrayVec.ClassName = "ArrayVec";
//# sourceMappingURL=genericArray.js.map