export * as NetworkModel from "./network";
export * from "./domain";
export * as CMCModel from "./coinmarketcap";
export declare type BaseBatchExchangeRateService<CurrenciesDto, ERDto> = {
    getBatchedRate(curencies: CurrenciesDto[]): Promise<ERDto>;
};
