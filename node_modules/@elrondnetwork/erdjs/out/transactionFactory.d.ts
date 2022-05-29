import { IAddress, IChainID, IGasLimit, IGasPrice, INonce, ITokenPayment, ITransactionPayload, ITransactionValue } from "./interface";
import { Transaction } from "./transaction";
interface IGasEstimator {
    forEGLDTransfer(dataLength: number): number;
    forESDTTransfer(dataLength: number): number;
    forESDTNFTTransfer(dataLength: number): number;
    forMultiESDTNFTTransfer(dataLength: number, numTransfers: number): number;
}
export declare class TransactionFactory {
    private readonly gasEstimator;
    constructor(gasEstimator: IGasEstimator);
    createEGLDTransfer(args: {
        nonce?: INonce;
        value: ITransactionValue;
        receiver: IAddress;
        sender?: IAddress;
        gasPrice?: IGasPrice;
        gasLimit?: IGasLimit;
        data?: ITransactionPayload;
        chainID: IChainID;
    }): Transaction;
    createESDTTransfer(args: {
        payment: ITokenPayment;
        nonce?: INonce;
        receiver: IAddress;
        sender?: IAddress;
        gasPrice?: IGasPrice;
        gasLimit?: IGasLimit;
        chainID: IChainID;
    }): Transaction;
    createESDTNFTTransfer(args: {
        payment: ITokenPayment;
        nonce?: INonce;
        destination: IAddress;
        sender: IAddress;
        gasPrice?: IGasPrice;
        gasLimit?: IGasLimit;
        chainID: IChainID;
    }): Transaction;
    createMultiESDTNFTTransfer(args: {
        payments: ITokenPayment[];
        nonce?: INonce;
        destination: IAddress;
        sender: IAddress;
        gasPrice?: IGasPrice;
        gasLimit?: IGasLimit;
        chainID: IChainID;
    }): Transaction;
}
export {};
