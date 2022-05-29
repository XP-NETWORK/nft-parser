import { Type, CustomType } from "./types";
export declare class TypeMapper {
    private readonly openTypesFactories;
    private readonly closedTypesMap;
    private readonly learnedTypesMap;
    constructor(learnedTypes?: CustomType[]);
    mapType(type: Type): Type;
    mapRecursiveType(type: Type): Type | null;
    private learnType;
    private mapStructType;
    private mapEnumType;
    private mappedFields;
    private mapGenericType;
}
