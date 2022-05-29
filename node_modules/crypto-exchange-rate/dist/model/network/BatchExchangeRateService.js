"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchExchangeRateService = void 0;
const axios_1 = __importDefault(require("axios"));
function batchExchangeRateService(baseURL) {
    const client = axios_1.default.create({
        baseURL,
        headers: {
            Accept: 'application/json',
        },
    });
    return {
        async getBatchedRate() {
            const res = await client.get('/batch_data');
            return res.data;
        },
    };
}
exports.batchExchangeRateService = batchExchangeRateService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmF0Y2hFeGNoYW5nZVJhdGVTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVsL25ldHdvcmsvQmF0Y2hFeGNoYW5nZVJhdGVTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUE2QztBQVU3QyxTQUFnQix3QkFBd0IsQ0FBQyxPQUFlO0lBQ3BELE1BQU0sTUFBTSxHQUFHLGVBQUssQ0FBQyxNQUFNLENBQUM7UUFDeEIsT0FBTztRQUNQLE9BQU8sRUFBRTtZQUNMLE1BQU0sRUFBRSxrQkFBa0I7U0FDN0I7S0FDSixDQUFDLENBQUM7SUFFSCxPQUFPO1FBQ0gsS0FBSyxDQUFDLGNBQWM7WUFDaEIsTUFBTSxHQUFHLEdBQW1DLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FDeEQsYUFBYSxDQUNoQixDQUFDO1lBRUYsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3BCLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQWpCRCw0REFpQkMifQ==