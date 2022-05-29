import BigNumber from "bignumber.js";
export declare class TokenPayment {
    readonly tokenIdentifier: string;
    readonly nonce: number;
    readonly amountAsBigInteger: BigNumber;
    readonly numDecimals: number;
    constructor(tokenIdentifier: string, nonce: number, amountAsBigInteger: BigNumber.Value, numDecimals: number);
    static egldFromAmount(amount: BigNumber.Value): TokenPayment;
    static egldFromBigInteger(amountAsBigInteger: BigNumber.Value): TokenPayment;
    static fungibleFromAmount(tokenIdentifier: string, amount: BigNumber.Value, numDecimals: number): TokenPayment;
    static fungibleFromBigInteger(tokenIdentifier: string, amountAsBigInteger: BigNumber.Value, numDecimals?: number): TokenPayment;
    static nonFungible(tokenIdentifier: string, nonce: number): TokenPayment;
    static semiFungible(tokenIdentifier: string, nonce: number, quantity: number): TokenPayment;
    static metaEsdtFromAmount(tokenIdentifier: string, nonce: number, amount: BigNumber.Value, numDecimals: number): TokenPayment;
    static metaEsdtFromBigInteger(tokenIdentifier: string, nonce: number, amountAsBigInteger: BigNumber.Value, numDecimals?: number): TokenPayment;
    toString(): string;
    valueOf(): BigNumber;
    toPrettyString(): string;
    toRationalNumber(): string;
    isEgld(): boolean;
    isFungible(): boolean;
}
