import ExchangeRateMap from './model/domain/ExchangeRateMap';
import { SupportedCurrency } from './model/domain/SupportedCurrency';
export declare type BatchExchangeRateRepo = {
    /**
     * Get exchange rate of multiple currencies to USD at once
     *
     * @param curencies list of currencies
     *
     * @return mapping of supported currencies to their usd values
     */
    getBatchedRate(curencies: SupportedCurrency[]): Promise<ExchangeRateMap>;
};
export declare type ExchangeRateRepo = {
    /**
     * Get exchange rate between two currencies c1/c2
     *
     * @param c1 First Currency
     * @param c2 Second Currency
     */
    getExchangeRate(c1: SupportedCurrency, c2: SupportedCurrency): Promise<number>;
};
