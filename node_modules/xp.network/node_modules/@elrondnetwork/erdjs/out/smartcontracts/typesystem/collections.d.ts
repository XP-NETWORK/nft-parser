import { TypedValue } from "./types";
export declare class CollectionOfTypedValues {
    private readonly items;
    constructor(items: TypedValue[]);
    getLength(): number;
    getItems(): ReadonlyArray<TypedValue>;
    valueOf(): any[];
    equals(other: CollectionOfTypedValues): boolean;
}
