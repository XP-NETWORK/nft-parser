"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeRateDtoMapper = void 0;
function exchangeRateDtoMapper(coinMarketIdMapper) {
    return {
        toDomain: (model) => {
            return new Map(Object.values(model.data).map(({ id, quote: { USD: usd } }) => [
                coinMarketIdMapper.toDomain(id),
                usd.price,
            ]));
        },
    };
}
exports.exchangeRateDtoMapper = exchangeRateDtoMapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhjaGFuZ2VSYXRlRHRvTWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVsL2NvaW5tYXJrZXRjYXAvRXhjaGFuZ2VSYXRlRHRvTWFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVFBLFNBQWdCLHFCQUFxQixDQUNqQyxrQkFBNEI7SUFFNUIsT0FBTztRQUNILFFBQVEsRUFBRSxDQUFDLEtBQXNCLEVBQUUsRUFBRTtZQUNqQyxPQUFPLElBQUksR0FBRyxDQUNWLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDM0Qsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztnQkFDL0IsR0FBRyxDQUFDLEtBQUs7YUFDWixDQUFDLENBQ0wsQ0FBQztRQUNOLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQWJELHNEQWFDIn0=