/// <reference types="node" />
import { ArrayVec, ArrayVecType } from "../typesystem";
import { BinaryCodec } from "./binary";
export declare class ArrayVecBinaryCodec {
    private readonly binaryCodec;
    constructor(binaryCodec: BinaryCodec);
    decodeNested(buffer: Buffer, type: ArrayVecType): [ArrayVec, number];
    decodeTopLevel(buffer: Buffer, type: ArrayVecType): ArrayVec;
    encodeNested(array: ArrayVec): Buffer;
    encodeTopLevel(array: ArrayVec): Buffer;
}
