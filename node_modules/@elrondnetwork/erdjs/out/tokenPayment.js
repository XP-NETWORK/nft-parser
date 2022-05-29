"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenPayment = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("./errors");
const EGLDTokenIdentifier = "EGLD";
const EGLDNumDecimals = 18;
// Note: this will actually set the default rounding mode for all BigNumber objects in the environment (in the application / dApp).
bignumber_js_1.default.set({ ROUNDING_MODE: 1 });
class TokenPayment {
    // TODO (breaking, next major version): constructor({ ... })
    constructor(tokenIdentifier, nonce, amountAsBigInteger, numDecimals) {
        let amount = new bignumber_js_1.default(amountAsBigInteger);
        if (!amount.isInteger() || amount.isNegative()) {
            throw new errors_1.ErrInvalidArgument(`bad amountAsBigInteger: ${amountAsBigInteger}`);
        }
        this.tokenIdentifier = tokenIdentifier;
        this.nonce = nonce;
        this.amountAsBigInteger = amount;
        this.numDecimals = numDecimals;
    }
    static egldFromAmount(amount) {
        let amountAsBigInteger = new bignumber_js_1.default(amount).shiftedBy(EGLDNumDecimals).decimalPlaces(0);
        return this.egldFromBigInteger(amountAsBigInteger);
    }
    static egldFromBigInteger(amountAsBigInteger) {
        return new TokenPayment(EGLDTokenIdentifier, 0, amountAsBigInteger, EGLDNumDecimals);
    }
    static fungibleFromAmount(tokenIdentifier, amount, numDecimals) {
        let amountAsBigInteger = new bignumber_js_1.default(amount).shiftedBy(numDecimals).decimalPlaces(0);
        return this.fungibleFromBigInteger(tokenIdentifier, amountAsBigInteger, numDecimals);
    }
    static fungibleFromBigInteger(tokenIdentifier, amountAsBigInteger, numDecimals = 0) {
        return new TokenPayment(tokenIdentifier, 0, amountAsBigInteger, numDecimals);
    }
    static nonFungible(tokenIdentifier, nonce) {
        return new TokenPayment(tokenIdentifier, nonce, 1, 0);
    }
    static semiFungible(tokenIdentifier, nonce, quantity) {
        return new TokenPayment(tokenIdentifier, nonce, quantity, 0);
    }
    static metaEsdtFromAmount(tokenIdentifier, nonce, amount, numDecimals) {
        let amountAsBigInteger = new bignumber_js_1.default(amount).shiftedBy(numDecimals).decimalPlaces(0);
        return this.metaEsdtFromBigInteger(tokenIdentifier, nonce, amountAsBigInteger, numDecimals);
    }
    static metaEsdtFromBigInteger(tokenIdentifier, nonce, amountAsBigInteger, numDecimals = 0) {
        return new TokenPayment(tokenIdentifier, nonce, amountAsBigInteger, numDecimals);
    }
    toString() {
        return this.amountAsBigInteger.toFixed(0);
    }
    valueOf() {
        return this.amountAsBigInteger;
    }
    toPrettyString() {
        return `${this.toRationalNumber()} ${this.tokenIdentifier}`;
    }
    // TODO (breaking, next major version): rename to "toAmount()", make it private.
    toRationalNumber() {
        return this.amountAsBigInteger.shiftedBy(-this.numDecimals).toFixed(this.numDecimals);
    }
    isEgld() {
        return this.tokenIdentifier == EGLDTokenIdentifier;
    }
    isFungible() {
        return this.nonce == 0;
    }
}
exports.TokenPayment = TokenPayment;
//# sourceMappingURL=tokenPayment.js.map