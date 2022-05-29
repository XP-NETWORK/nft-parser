import { BatchExchangeRateRepo, ExchangeRateRepo } from './BaseExchangeRateRepo';
declare type CacheExpiry = {
    getCacheExpiry(): number;
};
/**
 * Exchange Rate Repo which uses cache from a BatchExchangeRateRepo source
 *
 * uses old cache on error
 *
 * @param baseBatch Base Repo for getting batch exchange rates
 * @param cacheExpiry time to wait before fetching new exchange rates. (Default: 1 hour)
 */
export declare function cachedExchangeRateRepo(baseBatch: BatchExchangeRateRepo, cacheExpiry?: number): ExchangeRateRepo & BatchExchangeRateRepo & CacheExpiry;
export {};
