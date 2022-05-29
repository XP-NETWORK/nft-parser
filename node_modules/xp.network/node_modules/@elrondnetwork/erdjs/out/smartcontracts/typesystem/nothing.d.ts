import { PrimitiveType, PrimitiveValue } from "./types";
export declare class NothingType extends PrimitiveType {
    static ClassName: string;
    constructor();
    getClassName(): string;
}
export declare class NothingValue extends PrimitiveValue {
    static ClassName: string;
    constructor();
    getClassName(): string;
    equals(_other: NothingValue): boolean;
    valueOf(): any;
}
