/// <reference types="node" />
import { Field, FieldDefinition } from "../typesystem";
import { BinaryCodec } from "./binary";
export declare class FieldsBinaryCodec {
    private readonly binaryCodec;
    constructor(binaryCodec: BinaryCodec);
    decodeNested(buffer: Buffer, fieldDefinitions: FieldDefinition[]): [Field[], number];
    encodeNested(fields: ReadonlyArray<Field>): Buffer;
}
