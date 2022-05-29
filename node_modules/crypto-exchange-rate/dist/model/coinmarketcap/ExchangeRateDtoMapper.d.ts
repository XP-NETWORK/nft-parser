import ExchangeRateMap from '../domain/ExchangeRateMap';
import { IdMapper } from './IdMapper';
import { ExchangeRateDto } from './ExchangeRateDto';
export declare type ExchangeRateDtoMapper = {
    toDomain(model: ExchangeRateDto): ExchangeRateMap;
};
export declare function exchangeRateDtoMapper(coinMarketIdMapper: IdMapper): ExchangeRateDtoMapper;
