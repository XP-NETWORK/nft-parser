import { BaseBatchExchangeRateService } from '..';
import { CMCId } from './CMCId';
import { ExchangeRateDto } from './ExchangeRateDto';
export declare type BatchExchangeRateService = BaseBatchExchangeRateService<CMCId, ExchangeRateDto>;
export declare function batchExchangeRateService(apiUri: string, apiKey: string): BatchExchangeRateService;
