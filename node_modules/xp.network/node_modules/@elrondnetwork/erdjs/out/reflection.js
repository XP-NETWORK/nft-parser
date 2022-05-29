"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJavascriptPrototypesInHierarchy = void 0;
function getJavascriptPrototypesInHierarchy(obj, filter) {
    let prototypes = [];
    let prototype = Object.getPrototypeOf(obj);
    while (prototype && filter(prototype)) {
        prototypes.push(prototype);
        prototype = Object.getPrototypeOf(prototype);
    }
    return prototypes;
}
exports.getJavascriptPrototypesInHierarchy = getJavascriptPrototypesInHierarchy;
//# sourceMappingURL=reflection.js.map