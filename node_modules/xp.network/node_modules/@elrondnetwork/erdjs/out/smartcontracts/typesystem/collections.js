"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionOfTypedValues = void 0;
class CollectionOfTypedValues {
    constructor(items) {
        this.items = items;
    }
    getLength() {
        return this.items.length;
    }
    getItems() {
        return this.items;
    }
    valueOf() {
        return this.items.map((item) => item.valueOf());
    }
    equals(other) {
        if (this.getLength() != other.getLength()) {
            return false;
        }
        for (let i = 0; i < this.getLength(); i++) {
            let selfItem = this.items[i];
            let otherItem = other.items[i];
            if (!selfItem.equals(otherItem)) {
                return false;
            }
        }
        return true;
    }
}
exports.CollectionOfTypedValues = CollectionOfTypedValues;
//# sourceMappingURL=collections.js.map