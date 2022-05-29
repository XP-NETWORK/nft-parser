"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interaction = void 0;
const query_1 = require("./query");
const function_1 = require("./function");
const address_1 = require("../address");
const typesystem_1 = require("./typesystem");
const constants_1 = require("../constants");
const interactionChecker_1 = require("./interactionChecker");
/**
 * Interactions can be seen as mutable transaction & query builders.
 *
 * Aside from building transactions and queries, the interactors are also responsible for interpreting
 * the execution outcome for the objects they've built.
 */
class Interaction {
    constructor(contract, func, args) {
        this.nonce = 0;
        this.value = "0";
        this.gasLimit = 0;
        this.gasPrice = undefined;
        this.chainID = "";
        this.querent = new address_1.Address();
        this.isWithSingleESDTTransfer = false;
        this.isWithSingleESDTNFTTransfer = false;
        this.isWithMultiESDTNFTTransfer = false;
        this.tokenTransfersSender = new address_1.Address();
        this.contract = contract;
        this.function = func;
        this.args = args;
        this.tokenTransfers = new TokenTransfersWithinInteraction([], this);
    }
    getContractAddress() {
        return this.contract.getAddress();
    }
    getFunction() {
        return this.function;
    }
    getEndpoint() {
        return this.contract.getEndpoint(this.function);
    }
    getArguments() {
        return this.args;
    }
    getValue() {
        return this.value;
    }
    getTokenTransfers() {
        return this.tokenTransfers.getTransfers();
    }
    getGasLimit() {
        return this.gasLimit;
    }
    getExplicitReceiver() {
        return this.explicitReceiver;
    }
    buildTransaction() {
        let receiver = this.explicitReceiver || this.contract.getAddress();
        let func = this.function;
        let args = this.args;
        if (this.isWithSingleESDTTransfer) {
            func = new function_1.ContractFunction(constants_1.ESDT_TRANSFER_FUNCTION_NAME);
            args = this.tokenTransfers.buildArgsForSingleESDTTransfer();
        }
        else if (this.isWithSingleESDTNFTTransfer) {
            // For NFT, SFT and MetaESDT, transaction.sender == transaction.receiver.
            receiver = this.tokenTransfersSender;
            func = new function_1.ContractFunction(constants_1.ESDTNFT_TRANSFER_FUNCTION_NAME);
            args = this.tokenTransfers.buildArgsForSingleESDTNFTTransfer();
        }
        else if (this.isWithMultiESDTNFTTransfer) {
            // For NFT, SFT and MetaESDT, transaction.sender == transaction.receiver.
            receiver = this.tokenTransfersSender;
            func = new function_1.ContractFunction(constants_1.MULTI_ESDTNFT_TRANSFER_FUNCTION_NAME);
            args = this.tokenTransfers.buildArgsForMultiESDTNFTTransfer();
        }
        let transaction = this.contract.call({
            func: func,
            // GasLimit will be set using "withGasLimit()".
            gasLimit: this.gasLimit,
            gasPrice: this.gasPrice,
            args: args,
            // Value will be set using "withValue()".
            value: this.value,
            receiver: receiver,
            chainID: this.chainID
        });
        transaction.setNonce(this.nonce);
        return transaction;
    }
    buildQuery() {
        return new query_1.Query({
            address: this.contract.getAddress(),
            func: this.function,
            args: this.args,
            // Value will be set using "withValue()".
            value: this.value,
            caller: this.querent
        });
    }
    withValue(value) {
        this.value = value;
        return this;
    }
    withSingleESDTTransfer(transfer) {
        this.isWithSingleESDTTransfer = true;
        this.tokenTransfers = new TokenTransfersWithinInteraction([transfer], this);
        return this;
    }
    withSingleESDTNFTTransfer(transfer, sender) {
        this.isWithSingleESDTNFTTransfer = true;
        this.tokenTransfers = new TokenTransfersWithinInteraction([transfer], this);
        this.tokenTransfersSender = sender;
        return this;
    }
    withMultiESDTNFTTransfer(transfers, sender) {
        this.isWithMultiESDTNFTTransfer = true;
        this.tokenTransfers = new TokenTransfersWithinInteraction(transfers, this);
        this.tokenTransfersSender = sender;
        return this;
    }
    withGasLimit(gasLimit) {
        this.gasLimit = gasLimit;
        return this;
    }
    withGasPrice(gasPrice) {
        this.gasPrice = gasPrice;
        return this;
    }
    withNonce(nonce) {
        this.nonce = nonce;
        return this;
    }
    useThenIncrementNonceOf(account) {
        return this.withNonce(account.getNonceThenIncrement());
    }
    withChainID(chainID) {
        this.chainID = chainID;
        return this;
    }
    /**
     * Sets the "caller" field on contract queries.
     */
    withQuerent(querent) {
        this.querent = querent;
        return this;
    }
    withExplicitReceiver(receiver) {
        this.explicitReceiver = receiver;
        return this;
    }
    /**
     * To perform custom checking, extend {@link Interaction} and override this method.
     */
    check() {
        new interactionChecker_1.InteractionChecker().checkInteraction(this, this.getEndpoint());
        return this;
    }
}
exports.Interaction = Interaction;
class TokenTransfersWithinInteraction {
    constructor(transfers, interaction) {
        this.transfers = transfers;
        this.interaction = interaction;
    }
    getTransfers() {
        return this.transfers;
    }
    buildArgsForSingleESDTTransfer() {
        let singleTransfer = this.transfers[0];
        return [
            this.getTypedTokenIdentifier(singleTransfer),
            this.getTypedTokenQuantity(singleTransfer),
            this.getTypedInteractionFunction(),
            ...this.getInteractionArguments()
        ];
    }
    buildArgsForSingleESDTNFTTransfer() {
        let singleTransfer = this.transfers[0];
        return [
            this.getTypedTokenIdentifier(singleTransfer),
            this.getTypedTokenNonce(singleTransfer),
            this.getTypedTokenQuantity(singleTransfer),
            this.getTypedTokensReceiver(),
            this.getTypedInteractionFunction(),
            ...this.getInteractionArguments()
        ];
    }
    buildArgsForMultiESDTNFTTransfer() {
        let result = [];
        result.push(this.getTypedTokensReceiver());
        result.push(this.getTypedNumberOfTransfers());
        for (const transfer of this.transfers) {
            result.push(this.getTypedTokenIdentifier(transfer));
            result.push(this.getTypedTokenNonce(transfer));
            result.push(this.getTypedTokenQuantity(transfer));
        }
        result.push(this.getTypedInteractionFunction());
        result.push(...this.getInteractionArguments());
        return result;
    }
    getTypedNumberOfTransfers() {
        return new typesystem_1.U8Value(this.transfers.length);
    }
    getTypedTokenIdentifier(transfer) {
        // Important: for NFTs, this has to be the "collection" name, actually.
        // We will reconsider adding the field "collection" on "Token" upon merging "ApiProvider" and "ProxyProvider".
        return typesystem_1.BytesValue.fromUTF8(transfer.tokenIdentifier);
    }
    getTypedTokenNonce(transfer) {
        // The token nonce (creation nonce)
        return new typesystem_1.U64Value(transfer.nonce);
    }
    getTypedTokenQuantity(transfer) {
        // For NFTs, this will be 1.
        return new typesystem_1.BigUIntValue(transfer.amountAsBigInteger);
    }
    getTypedTokensReceiver() {
        // The actual receiver of the token(s): the contract
        return new typesystem_1.AddressValue(this.interaction.getContractAddress());
    }
    getTypedInteractionFunction() {
        return typesystem_1.BytesValue.fromUTF8(this.interaction.getFunction().valueOf());
    }
    getInteractionArguments() {
        return this.interaction.getArguments();
    }
}
//# sourceMappingURL=interaction.js.map