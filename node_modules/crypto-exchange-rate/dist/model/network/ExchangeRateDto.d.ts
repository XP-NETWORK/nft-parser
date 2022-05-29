import { SupportedCurrency } from '../domain';
export declare type ExchangeRateDto = {
    [key in SupportedCurrency]: number;
};
