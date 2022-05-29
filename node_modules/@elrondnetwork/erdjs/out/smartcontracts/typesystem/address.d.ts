import { Address } from "../../address";
import { IAddress } from "../../interface";
import { PrimitiveType, PrimitiveValue } from "./types";
export declare class AddressType extends PrimitiveType {
    static ClassName: string;
    constructor();
    getClassName(): string;
}
/**
 * An address fed to or fetched from a Smart Contract contract, as an immutable abstraction.
 */
export declare class AddressValue extends PrimitiveValue {
    static ClassName: string;
    private readonly value;
    constructor(value: IAddress);
    getClassName(): string;
    /**
     * Returns whether two objects have the same value.
     *
     * @param other another AddressValue
     */
    equals(other: AddressValue): boolean;
    valueOf(): Address;
}
