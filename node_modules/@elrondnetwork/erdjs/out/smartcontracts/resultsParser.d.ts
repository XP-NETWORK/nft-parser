import { TransactionMetadata } from "@elrondnetwork/transaction-decoder";
import { IContractQueryResponse, ITransactionOnNetwork } from "../interfaceOfNetwork";
import { TypedOutcomeBundle, UntypedOutcomeBundle } from "./interface";
import { EndpointDefinition } from "./typesystem";
/**
 * Parses contract query responses and smart contract results.
 * The parsing involves some heuristics, in order to handle slight inconsistencies (e.g. some SCRs are present on API, but missing on Gateway).
 */
export declare class ResultsParser {
    parseQueryResponse(queryResponse: IContractQueryResponse, endpoint: EndpointDefinition): TypedOutcomeBundle;
    parseUntypedQueryResponse(queryResponse: IContractQueryResponse): UntypedOutcomeBundle;
    parseOutcome(transaction: ITransactionOnNetwork, endpoint: EndpointDefinition): TypedOutcomeBundle;
    parseUntypedOutcome(transaction: ITransactionOnNetwork): UntypedOutcomeBundle;
    private parseTransactionMetadata;
    private createBundleOnSimpleMoveBalance;
    private createBundleOnInvalidTransaction;
    private createBundleOnEasilyFoundResultWithReturnData;
    private createBundleOnSignalError;
    private createBundleOnTooMuchGasWarning;
    private createBundleOnWriteLogWhereFirstTopicEqualsAddress;
    /**
     * Override this method (in a subclass of {@link ResultsParser}) if the basic heuristics of the parser are not sufficient.
     */
    protected createBundleWithCustomHeuristics(_transaction: ITransactionOnNetwork, _transactionMetadata: TransactionMetadata): UntypedOutcomeBundle | null;
    private createBundleWithFallbackHeuristics;
    private sliceDataFieldInParts;
}
