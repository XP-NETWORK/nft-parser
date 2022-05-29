/// <reference types="node" />
import { NothingValue } from "../typesystem";
export declare class NothingCodec {
    decodeNested(): [NothingValue, number];
    decodeTopLevel(): NothingValue;
    encodeNested(): Buffer;
    encodeTopLevel(): Buffer;
}
