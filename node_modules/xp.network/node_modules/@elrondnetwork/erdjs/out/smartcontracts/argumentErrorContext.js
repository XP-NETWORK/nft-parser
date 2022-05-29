"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentErrorContext = void 0;
const errors_1 = require("../errors");
class ArgumentErrorContext {
    constructor(endpointName, argumentIndex, parameterDefinition) {
        this.endpointName = endpointName;
        this.argumentIndex = argumentIndex;
        this.parameterDefinition = parameterDefinition;
    }
    throwError(specificError) {
        throw new errors_1.ErrInvalidArgument(`Error when converting arguments for endpoint (endpoint name: ${this.endpointName}, argument index: ${this.argumentIndex}, name: ${this.parameterDefinition.name}, type: ${this.parameterDefinition.type})\nNested error: ${specificError}`);
    }
    convertError(native, typeName) {
        this.throwError(`Can't convert argument (argument: ${native}, type ${typeof native}), wanted type: ${typeName})`);
    }
    unhandledType(functionName, type) {
        this.throwError(`Unhandled type (function: ${functionName}, type: ${type})`);
    }
    guardSameLength(native, valueTypes) {
        native = native || [];
        if (native.length != valueTypes.length) {
            this.throwError(`Incorrect composite type length: have ${native.length}, expected ${valueTypes.length} (argument: ${native})`);
        }
    }
    guardHasField(native, fieldName) {
        native = native || {};
        if (!(fieldName in native)) {
            this.throwError(`Struct argument does not contain a field named "${fieldName}" (argument: ${JSON.stringify(native)})`);
        }
    }
}
exports.ArgumentErrorContext = ArgumentErrorContext;
//# sourceMappingURL=argumentErrorContext.js.map