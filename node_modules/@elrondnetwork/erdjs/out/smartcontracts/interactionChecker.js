"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionChecker = void 0;
const errors = __importStar(require("../errors"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
/**
 * An interaction checker that aims to be as strict as possible.
 * It is designed to catch programmer errors such as:
 *  - incorrect types of contract call arguments
 *  - errors related to calling "non-payable" functions with some value provided
 *  - gas estimation errors (not yet implemented)
 */
class InteractionChecker {
    checkInteraction(interaction, definition) {
        this.checkPayable(interaction, definition);
        this.checkArguments(interaction, definition);
    }
    checkPayable(interaction, definition) {
        let hasValue = !new bignumber_js_1.default(interaction.getValue().toString()).isZero();
        let isPayableInEGLD = definition.modifiers.isPayableInEGLD();
        if (hasValue && !isPayableInEGLD) {
            throw new errors.ErrContractInteraction("cannot send EGLD value to non-payable");
        }
    }
    checkArguments(interaction, definition) {
        let formalArguments = definition.input;
        let actualArguments = interaction.getArguments();
        let numFormalArguments = formalArguments.length;
        let numActualArguments = actualArguments.length;
        if (numFormalArguments != numActualArguments) {
            throw new errors.ErrContractInteraction(`bad arguments, expected: ${numFormalArguments}, got: ${numActualArguments}`);
        }
        // TODO: discuss again, possibly redesign the handling of covariance / contravariance.
        for (let i = 0; i < numFormalArguments; i++) {
            let expectedType = formalArguments[i].type;
            let argument = actualArguments[i];
            let actualType = argument.getType();
            // isAssignableFrom() is responsible to handle covariance and contravariance (depending on the class that overrides it).
            let ok = expectedType.isAssignableFrom(actualType);
            if (!ok) {
                throw new errors.ErrContractInteraction(`type mismatch at index ${i}, expected: ${expectedType}, got: ${actualType}`);
            }
        }
    }
}
exports.InteractionChecker = InteractionChecker;
//# sourceMappingURL=interactionChecker.js.map