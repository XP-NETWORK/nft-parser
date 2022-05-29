"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const address_1 = require("../address");
const argSerializer_1 = require("./argSerializer");
class Query {
    constructor(obj) {
        this.caller = obj.caller || new address_1.Address();
        this.address = obj.address;
        this.func = obj.func;
        this.args = obj.args || [];
        this.value = obj.value || 0;
    }
    getEncodedArguments() {
        return new argSerializer_1.ArgSerializer().valuesToStrings(this.args);
    }
}
exports.Query = Query;
//# sourceMappingURL=query.js.map