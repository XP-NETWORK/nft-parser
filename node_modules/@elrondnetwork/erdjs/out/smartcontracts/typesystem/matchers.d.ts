import { Type, PrimitiveType, PrimitiveValue } from "./types";
import { TypedValue } from "./types";
export declare function onTypeSelect<TResult>(type: Type, selectors: {
    onOption: () => TResult;
    onList: () => TResult;
    onArray: () => TResult;
    onPrimitive: () => TResult;
    onStruct: () => TResult;
    onTuple: () => TResult;
    onEnum: () => TResult;
    onOther?: () => TResult;
}): TResult;
export declare function onTypedValueSelect<TResult>(value: TypedValue, selectors: {
    onPrimitive: () => TResult;
    onOption: () => TResult;
    onList: () => TResult;
    onArray: () => TResult;
    onStruct: () => TResult;
    onTuple: () => TResult;
    onEnum: () => TResult;
    onOther?: () => TResult;
}): TResult;
export declare function onPrimitiveValueSelect<TResult>(value: PrimitiveValue, selectors: {
    onBoolean: () => TResult;
    onNumerical: () => TResult;
    onAddress: () => TResult;
    onBytes: () => TResult;
    onString: () => TResult;
    onH256: () => TResult;
    onTypeIdentifier: () => TResult;
    onNothing: () => TResult;
    onOther?: () => TResult;
}): TResult;
export declare function onPrimitiveTypeSelect<TResult>(type: PrimitiveType, selectors: {
    onBoolean: () => TResult;
    onNumerical: () => TResult;
    onAddress: () => TResult;
    onBytes: () => TResult;
    onString: () => TResult;
    onH256: () => TResult;
    onTokenIndetifier: () => TResult;
    onNothing: () => TResult;
    onOther?: () => TResult;
}): TResult;
