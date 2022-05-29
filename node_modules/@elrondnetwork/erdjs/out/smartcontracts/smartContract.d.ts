import { Transaction } from "../transaction";
import { CallArguments, DeployArguments, ISmartContract, QueryArguments, UpgradeArguments } from "./interface";
import { ContractFunction } from "./function";
import { Query } from "./query";
import { SmartContractAbi } from "./abi";
import { EndpointDefinition, TypedValue } from "./typesystem";
import { Interaction } from "./interaction";
import { IAddress, INonce } from "../interface";
/**
 * An abstraction for deploying and interacting with Smart Contracts.
 */
export declare class SmartContract implements ISmartContract {
    private address;
    private abi?;
    /**
     * This object contains a function for each endpoint defined by the contract.
     * (a bit similar to web3js's "contract.methods").
     */
    readonly methodsExplicit: {
        [key: string]: (args?: TypedValue[]) => Interaction;
    };
    /**
     * This object contains a function for each endpoint defined by the contract.
     * (a bit similar to web3js's "contract.methods").
     *
     * This is an alternative to {@link methodsExplicit}.
     * Unlike {@link methodsExplicit}, automatic type inference (wrt. ABI) is applied when using {@link methods}.
     */
    readonly methods: {
        [key: string]: (args?: any[]) => Interaction;
    };
    /**
     * Create a SmartContract object by providing its address on the Network.
     */
    constructor({ address, abi }: {
        address?: IAddress;
        abi?: SmartContractAbi;
    });
    private setupMethods;
    /**
     * Sets the address, as on Network.
     */
    setAddress(address: IAddress): void;
    /**
     * Gets the address, as on Network.
     */
    getAddress(): IAddress;
    setAbi(abi: SmartContractAbi): void;
    getAbi(): SmartContractAbi;
    getEndpoint(name: string | ContractFunction): EndpointDefinition;
    /**
     * Creates a {@link Transaction} for deploying the Smart Contract to the Network.
     */
    deploy({ code, codeMetadata, initArguments, value, gasLimit, gasPrice, chainID }: DeployArguments): Transaction;
    /**
     * Creates a {@link Transaction} for upgrading the Smart Contract on the Network.
     */
    upgrade({ code, codeMetadata, initArguments, value, gasLimit, gasPrice, chainID }: UpgradeArguments): Transaction;
    /**
     * Creates a {@link Transaction} for calling (a function of) the Smart Contract.
     */
    call({ func, args, value, gasLimit, receiver, gasPrice, chainID }: CallArguments): Transaction;
    createQuery({ func, args, value, caller }: QueryArguments): Query;
    private ensureHasAddress;
    /**
     * Computes the address of a Smart Contract.
     * The address is computed deterministically, from the address of the owner and the nonce of the deployment transaction.
     *
     * @param owner The owner of the Smart Contract
     * @param nonce The owner nonce used for the deployment transaction
     */
    static computeAddress(owner: IAddress, nonce: INonce): IAddress;
}
