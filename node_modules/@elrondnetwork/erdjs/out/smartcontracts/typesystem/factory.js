"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListOfTokenIdentifiers = exports.createListOfAddresses = void 0;
const address_1 = require("./address");
const generic_1 = require("./generic");
const tokenIdentifier_1 = require("./tokenIdentifier");
function createListOfAddresses(addresses) {
    let addressesTyped = addresses.map(address => new address_1.AddressValue(address));
    let list = generic_1.List.fromItems(addressesTyped);
    return list;
}
exports.createListOfAddresses = createListOfAddresses;
function createListOfTokenIdentifiers(identifiers) {
    let identifiersTyped = identifiers.map(identifier => new tokenIdentifier_1.TokenIdentifierValue(identifier));
    let list = generic_1.List.fromItems(identifiersTyped);
    return list;
}
exports.createListOfTokenIdentifiers = createListOfTokenIdentifiers;
//# sourceMappingURL=factory.js.map