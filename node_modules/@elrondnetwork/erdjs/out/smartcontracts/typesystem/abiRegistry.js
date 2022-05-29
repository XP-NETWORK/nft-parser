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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbiRegistry = void 0;
const errors = __importStar(require("../../errors"));
const utils_1 = require("../../utils");
const struct_1 = require("./struct");
const contractInterface_1 = require("./contractInterface");
const enum_1 = require("./enum");
const typeMapper_1 = require("./typeMapper");
const endpoint_1 = require("./endpoint");
class AbiRegistry {
    constructor() {
        this.interfaces = [];
        this.customTypes = [];
    }
    static create(json) {
        let registry = new AbiRegistry().extend(json);
        let remappedRegistry = registry.remapToKnownTypes();
        return remappedRegistry;
    }
    extend(json) {
        json.types = json.types || {};
        // The "endpoints" collection is interpreted by "ContractInterface".
        let iface = contractInterface_1.ContractInterface.fromJSON(json);
        this.interfaces.push(iface);
        for (const customTypeName in json.types) {
            let itemJson = json.types[customTypeName];
            let typeDiscriminant = itemJson.type;
            // Workaround: set the "name" field, as required by "fromJSON()" below.
            itemJson.name = customTypeName;
            let customType = this.createCustomType(typeDiscriminant, itemJson);
            this.customTypes.push(customType);
        }
        this.sortCustomTypesByDependencies();
        return this;
    }
    createCustomType(typeDiscriminant, json) {
        if (typeDiscriminant == "struct") {
            return struct_1.StructType.fromJSON(json);
        }
        if (typeDiscriminant == "enum") {
            return enum_1.EnumType.fromJSON(json);
        }
        throw new errors.ErrTypingSystem(`Unknown type discriminant: ${typeDiscriminant}`);
    }
    sortCustomTypesByDependencies() {
        // TODO: Improve consistency of the sorting function (and make sure the sorting is stable): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        this.customTypes.sort((a, b) => {
            const bDependsOnA = b.getNamesOfDependencies().indexOf(a.getName()) > -1;
            if (bDependsOnA) {
                // Sort "a" before "b".
                return -1;
            }
            // Sort "b" before "a".
            return 1;
        });
    }
    getInterface(name) {
        let result = this.interfaces.find((e) => e.name == name);
        utils_1.guardValueIsSetWithMessage(`interface [${name}] not found`, result);
        return result;
    }
    getInterfaces(names) {
        return names.map((name) => this.getInterface(name));
    }
    getStruct(name) {
        let result = this.customTypes.find((e) => e.getName() == name && e.hasExactClass(struct_1.StructType.ClassName));
        utils_1.guardValueIsSetWithMessage(`struct [${name}] not found`, result);
        return result;
    }
    getStructs(names) {
        return names.map((name) => this.getStruct(name));
    }
    getEnum(name) {
        let result = this.customTypes.find((e) => e.getName() == name && e.hasExactClass(enum_1.EnumType.ClassName));
        utils_1.guardValueIsSetWithMessage(`enum [${name}] not found`, result);
        return result;
    }
    getEnums(names) {
        return names.map((name) => this.getEnum(name));
    }
    /**
     * Right after loading ABI definitions into a registry, the endpoints and the custom types (structs, enums)
     * use raw types for their I/O parameters (in the case of endpoints), or for their fields (in the case of structs).
     *
     * A raw type is merely an instance of {@link Type}, with a given name and type parameters (if it's a generic type).
     *
     * Though, for most (development) purposes, we'd like to operate using known, specific types (e.g. {@link List}, {@link U8Type} etc.).
     * This function increases the specificity of the types used by parameter / field definitions within a registry (on best-efforts basis).
     * The result is an equivalent, more explicit ABI registry.
     */
    remapToKnownTypes() {
        let mapper = new typeMapper_1.TypeMapper([]);
        let newCustomTypes = [];
        let newInterfaces = [];
        // First, remap custom types (actually, under the hood, this will remap types of struct fields)
        for (const type of this.customTypes) {
            const mappedTyped = mapper.mapType(type);
            newCustomTypes.push(mappedTyped);
        }
        // Then, remap types of all endpoint parameters.
        // But we'll use an enhanced mapper, that takes into account the results from the previous step.
        mapper = new typeMapper_1.TypeMapper(newCustomTypes);
        for (const iface of this.interfaces) {
            let newEndpoints = [];
            for (const endpoint of iface.endpoints) {
                newEndpoints.push(mapEndpoint(endpoint, mapper));
            }
            let newConstructor = iface.constructorDefinition ? mapEndpoint(iface.constructorDefinition, mapper) : null;
            newInterfaces.push(new contractInterface_1.ContractInterface(iface.name, newConstructor, newEndpoints));
        }
        // Now return the new registry, with all types remapped to known types
        let newRegistry = new AbiRegistry();
        newRegistry.customTypes.push(...newCustomTypes);
        newRegistry.interfaces.push(...newInterfaces);
        return newRegistry;
    }
}
exports.AbiRegistry = AbiRegistry;
function mapEndpoint(endpoint, mapper) {
    let newInput = endpoint.input.map((e) => new endpoint_1.EndpointParameterDefinition(e.name, e.description, mapper.mapType(e.type)));
    let newOutput = endpoint.output.map((e) => new endpoint_1.EndpointParameterDefinition(e.name, e.description, mapper.mapType(e.type)));
    return new endpoint_1.EndpointDefinition(endpoint.name, newInput, newOutput, endpoint.modifiers);
}
//# sourceMappingURL=abiRegistry.js.map