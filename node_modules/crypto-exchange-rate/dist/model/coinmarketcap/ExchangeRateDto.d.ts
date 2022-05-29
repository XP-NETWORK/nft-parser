export interface USD {
    price: number;
    volume_24h: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    market_cap: number;
    market_cap_dominance: number;
    fully_diluted_market_cap: number;
    last_updated: Date;
}
export interface Quote {
    USD: USD;
}
export interface CurrencyData {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    is_active: number;
    is_fiat: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    date_added: Date;
    num_market_pairs: number;
    cmc_rank: number;
    last_updated: Date;
    tags: string[];
    quote: Quote;
}
export interface Status {
    timestamp: Date;
    error_code: number;
    error_message: string;
    elapsed: number;
    credit_count: number;
}
export interface ExchangeRateDto {
    data: {
        [k: number]: CurrencyData;
    };
    status: Status;
}
