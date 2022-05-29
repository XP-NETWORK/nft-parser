"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
/**
 * Bytecode of a Smart Contract, as an abstraction.
 */
class Code {
    constructor(hex) {
        this.hex = hex;
    }
    /**
     * Creates a Code object from a buffer (sequence of bytes).
     */
    static fromBuffer(code) {
        return new Code(code.toString("hex"));
    }
    /**
     * Returns the bytecode as a hex-encoded string.
     */
    toString() {
        return this.hex;
    }
    valueOf() {
        return Buffer.from(this.hex, "hex");
    }
}
exports.Code = Code;
//# sourceMappingURL=code.js.map