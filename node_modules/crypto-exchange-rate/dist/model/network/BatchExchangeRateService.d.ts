import { BaseBatchExchangeRateService } from '..';
import { SupportedCurrency } from '../domain';
import { ExchangeRateDto } from './ExchangeRateDto';
export declare type BatchExchangeRateService = BaseBatchExchangeRateService<SupportedCurrency, ExchangeRateDto>;
export declare function batchExchangeRateService(baseURL: string): {
    getBatchedRate(): Promise<ExchangeRateDto>;
};
