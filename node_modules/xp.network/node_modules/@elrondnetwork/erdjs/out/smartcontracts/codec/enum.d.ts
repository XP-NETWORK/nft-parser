/// <reference types="node" />
import { EnumType, EnumValue } from "../typesystem";
import { BinaryCodec } from "./binary";
export declare class EnumBinaryCodec {
    private readonly binaryCodec;
    private readonly fieldsCodec;
    constructor(binaryCodec: BinaryCodec);
    decodeTopLevel(buffer: Buffer, type: EnumType): EnumValue;
    decodeNested(buffer: Buffer, type: EnumType): [EnumValue, number];
    private readDiscriminant;
    encodeNested(enumValue: EnumValue): Buffer;
    encodeTopLevel(enumValue: EnumValue): Buffer;
}
