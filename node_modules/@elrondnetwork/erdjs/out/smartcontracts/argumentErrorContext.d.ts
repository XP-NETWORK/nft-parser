import { EndpointParameterDefinition, Type } from "./typesystem";
export declare class ArgumentErrorContext {
    endpointName: string;
    argumentIndex: number;
    parameterDefinition: EndpointParameterDefinition;
    constructor(endpointName: string, argumentIndex: number, parameterDefinition: EndpointParameterDefinition);
    throwError(specificError: string): never;
    convertError(native: any, typeName: string): never;
    unhandledType(functionName: string, type: Type): never;
    guardSameLength<T>(native: any[], valueTypes: T[]): void;
    guardHasField(native: any, fieldName: string): void;
}
