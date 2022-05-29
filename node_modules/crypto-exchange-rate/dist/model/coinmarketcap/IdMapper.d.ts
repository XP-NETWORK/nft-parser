import { SupportedCurrency } from '../domain/SupportedCurrency';
import { CMCId } from './CMCId';
export declare type IdMapper = {
    toDomain(id: CMCId): SupportedCurrency;
    fromDomain(domain: SupportedCurrency): CMCId;
    toDomainList(models: CMCId[]): SupportedCurrency[];
    fromDomainList(domains: SupportedCurrency[]): CMCId[];
};
export declare function idMapper(): IdMapper;
