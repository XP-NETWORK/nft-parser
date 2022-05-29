"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeRateDtoMapper = void 0;
const domain_1 = require("../domain");
function exchangeRateDtoMapper() {
    return {
        toDomain: (model) => new Map(Object.entries(model).map(([ent, v]) => [
            domain_1.SupportedCurrency[ent],
            v,
        ])),
    };
}
exports.exchangeRateDtoMapper = exchangeRateDtoMapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhjaGFuZ2VSYXRlRHRvTWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVsL25ldHdvcmsvRXhjaGFuZ2VSYXRlRHRvTWFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUE4QztBQVU5QyxTQUFnQixxQkFBcUI7SUFDakMsT0FBTztRQUNILFFBQVEsRUFBRSxDQUFDLEtBQXNCLEVBQUUsRUFBRSxDQUNqQyxJQUFJLEdBQUcsQ0FDSCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNwQywwQkFBaUIsQ0FBQyxHQUFZLENBQUM7WUFDL0IsQ0FBQztTQUNKLENBQUMsQ0FDTDtLQUNSLENBQUM7QUFDTixDQUFDO0FBVkQsc0RBVUMifQ==