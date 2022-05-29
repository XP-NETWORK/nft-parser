import { FieldDefinition, Field } from "./fields";
import { CustomType, TypedValue } from "./types";
export declare class StructType extends CustomType {
    static ClassName: string;
    private readonly fieldsDefinitions;
    constructor(name: string, fieldsDefinitions: FieldDefinition[]);
    getClassName(): string;
    static fromJSON(json: {
        name: string;
        fields: any[];
    }): StructType;
    getFieldsDefinitions(): FieldDefinition[];
    getFieldDefinition(name: string): FieldDefinition | undefined;
    getNamesOfDependencies(): string[];
}
export declare class Struct extends TypedValue {
    static ClassName: string;
    private readonly fields;
    private readonly fieldsByName;
    /**
     * One can only set fields at initialization time.
     */
    constructor(type: StructType, fields: Field[]);
    getClassName(): string;
    private checkTyping;
    getFields(): ReadonlyArray<Field>;
    getFieldValue(name: string): any;
    valueOf(): any;
    equals(other: Struct): boolean;
}
