import ExchangeRateMap from '../domain/ExchangeRateMap';
import { ExchangeRateDto } from './ExchangeRateDto';
export declare type ExchangeRateDtoMapper = {
    toDomain(model: ExchangeRateDto): ExchangeRateMap;
};
export declare function exchangeRateDtoMapper(): ExchangeRateDtoMapper;
