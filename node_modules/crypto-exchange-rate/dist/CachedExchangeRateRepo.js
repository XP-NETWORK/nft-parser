"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cachedExchangeRateRepo = void 0;
const SupportedCurrency_1 = require("./model/domain/SupportedCurrency");
/**
 * Exchange Rate Repo which uses cache from a BatchExchangeRateRepo source
 *
 * uses old cache on error
 *
 * @param baseBatch Base Repo for getting batch exchange rates
 * @param cacheExpiry time to wait before fetching new exchange rates. (Default: 1 hour)
 */
function cachedExchangeRateRepo(baseBatch, cacheExpiry = 3.6e6) {
    let _cache = undefined;
    let _cache_ms = Date.now();
    const supported = Object.values(SupportedCurrency_1.SupportedCurrency).filter((v) => v !== SupportedCurrency_1.SupportedCurrency.OPL);
    function getCacheExpiry() {
        const diff = Date.now() - _cache_ms;
        if (diff > cacheExpiry) {
            return 0;
        }
        else {
            return cacheExpiry - diff;
        }
    }
    async function getCache() {
        const fetchCache = async () => {
            _cache = await baseBatch.getBatchedRate(Object.values(supported));
            _cache.set(SupportedCurrency_1.SupportedCurrency.OPL, 0.01);
            _cache_ms = Date.now();
        };
        if (_cache === undefined) {
            await fetchCache();
        }
        else if (getCacheExpiry() == 0) {
            const old_cache = new Map(_cache);
            await fetchCache().catch((e) => {
                console.warn(`failed to fetch exchange rate: ${e}, using old data!`);
                _cache = old_cache;
            });
        }
        return _cache;
    }
    return {
        async getExchangeRate(c1, c2) {
            const cache = await getCache();
            const r1 = cache.get(c1);
            const r2 = cache.get(c2);
            if (r1 === undefined || r2 === undefined) {
                throw Error('imporper batch exchange impl?!');
            }
            return r1 / r2;
        },
        async getBatchedRate() {
            return new Map(await getCache());
        },
        getCacheExpiry,
    };
}
exports.cachedExchangeRateRepo = cachedExchangeRateRepo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FjaGVkRXhjaGFuZ2VSYXRlUmVwby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWNoZWRFeGNoYW5nZVJhdGVSZXBvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLHdFQUFxRTtBQU1yRTs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0Isc0JBQXNCLENBQ2xDLFNBQWdDLEVBQ2hDLFdBQVcsR0FBRyxLQUFLO0lBRW5CLElBQUksTUFBTSxHQUFnQyxTQUFTLENBQUM7SUFDcEQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMscUNBQWlCLENBQUMsQ0FBQyxNQUFNLENBQ3JELENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUsscUNBQWlCLENBQUMsR0FBRyxDQUNyQyxDQUFDO0lBQ0YsU0FBUyxjQUFjO1FBQ25CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUM7UUFDcEMsSUFBSSxJQUFJLEdBQUcsV0FBVyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7YUFBTTtZQUNILE9BQU8sV0FBVyxHQUFHLElBQUksQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFFRCxLQUFLLFVBQVUsUUFBUTtRQUNuQixNQUFNLFVBQVUsR0FBRyxLQUFLLElBQUksRUFBRTtZQUMxQixNQUFNLEdBQUcsTUFBTSxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsRSxNQUFNLENBQUMsR0FBRyxDQUFDLHFDQUFpQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4QyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQztRQUNGLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN0QixNQUFNLFVBQVUsRUFBRSxDQUFDO1NBQ3RCO2FBQU0sSUFBSSxjQUFjLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDOUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsTUFBTSxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLElBQUksQ0FDUixrQ0FBa0MsQ0FBQyxtQkFBbUIsQ0FDekQsQ0FBQztnQkFDRixNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLE1BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsT0FBTztRQUNILEtBQUssQ0FBQyxlQUFlLENBQ2pCLEVBQXFCLEVBQ3JCLEVBQXFCO1lBRXJCLE1BQU0sS0FBSyxHQUFHLE1BQU0sUUFBUSxFQUFFLENBQUM7WUFDL0IsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN6QixNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXpCLElBQUksRUFBRSxLQUFLLFNBQVMsSUFBSSxFQUFFLEtBQUssU0FBUyxFQUFFO2dCQUN0QyxNQUFNLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2FBQ2pEO1lBRUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ25CLENBQUM7UUFDRCxLQUFLLENBQUMsY0FBYztZQUNoQixPQUFPLElBQUksR0FBRyxDQUFDLE1BQU0sUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBQ0QsY0FBYztLQUNqQixDQUFDO0FBQ04sQ0FBQztBQTNERCx3REEyREMifQ==