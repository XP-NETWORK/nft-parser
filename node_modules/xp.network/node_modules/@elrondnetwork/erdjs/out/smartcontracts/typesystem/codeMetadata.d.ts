import { CodeMetadata } from "../codeMetadata";
import { PrimitiveType, PrimitiveValue } from "./types";
export declare class CodeMetadataType extends PrimitiveType {
    constructor();
}
export declare class CodeMetadataValue extends PrimitiveValue {
    private readonly value;
    constructor(value: CodeMetadata);
    equals(other: CodeMetadataValue): boolean;
    valueOf(): CodeMetadata;
}
