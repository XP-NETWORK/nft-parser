"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionProvider = void 0;
const signableMessage_1 = require("../signableMessage");
const signature_1 = require("../signature");
const transaction_1 = require("../transaction");
class ExtensionProvider {
    constructor() {
        this.initialized = false;
        if (ExtensionProvider._instance) {
            throw new Error("Error: Instantiation failed: Use ExtensionProvider.getInstance() instead of new.");
        }
        this.account = { address: "" };
        ExtensionProvider._instance = this;
    }
    static getInstance() {
        return ExtensionProvider._instance;
    }
    setAddress(address) {
        this.account.address = address;
        return ExtensionProvider._instance;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (window && window.elrondWallet) {
                this.initialized = true;
            }
            return this.initialized;
        });
    }
    login(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.initialized) {
                throw new Error("Extension provider is not initialised, call init() first");
            }
            const { token } = options;
            const data = token ? token : "";
            yield this.startBgrMsgChannel("connect", data);
            return this.account.address;
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.initialized) {
                throw new Error("Extension provider is not initialised, call init() first");
            }
            try {
                yield this.startBgrMsgChannel("logout", this.account.address);
            }
            catch (error) {
                console.warn("Extension origin url is already cleared!", error);
            }
            return true;
        });
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.initialized) {
                throw new Error("Extension provider is not initialised, call init() first");
            }
            return this.account ? this.account.address : "";
        });
    }
    isInitialized() {
        return this.initialized;
    }
    isConnected() {
        return __awaiter(this, void 0, void 0, function* () {
            return !!this.account;
        });
    }
    sendTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const txResponse = yield this.startBgrMsgChannel("sendTransactions", {
                from: this.account.address,
                transactions: [transaction.toPlainObject()],
            });
            return transaction_1.Transaction.fromPlainObject(txResponse[0]);
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const txResponse = yield this.startBgrMsgChannel("signTransactions", {
                from: this.account.address,
                transactions: [transaction.toPlainObject()],
            });
            return transaction_1.Transaction.fromPlainObject(txResponse[0]);
        });
    }
    signTransactions(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            transactions = transactions.map((transaction) => transaction.toPlainObject());
            let txResponse = yield this.startBgrMsgChannel("signTransactions", {
                from: this.account.address,
                transactions: transactions,
            });
            try {
                txResponse = txResponse.map((transaction) => transaction_1.Transaction.fromPlainObject(transaction));
            }
            catch (error) {
                throw new Error("Transaction canceled.");
            }
            return txResponse;
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                account: this.account.address,
                message: message.message.toString(),
            };
            const signResponse = yield this.startBgrMsgChannel("signMessage", data);
            const signedMsg = new signableMessage_1.SignableMessage({
                address: message.address,
                message: Buffer.from(signResponse.message),
                signature: new signature_1.Signature(signResponse.signature),
            });
            return signedMsg;
        });
    }
    cancelAction() {
        return this.startBgrMsgChannel("cancelAction", {});
    }
    startBgrMsgChannel(operation, connectData) {
        return new Promise((resolve) => {
            window.postMessage({
                target: "erdw-inpage",
                type: operation,
                data: connectData,
            }, window.origin);
            const eventHandler = (event) => {
                if (event.isTrusted && event.data.target === "erdw-contentScript") {
                    if (event.data.type === "connectResponse") {
                        this.account = event.data.data;
                        window.removeEventListener("message", eventHandler);
                        resolve(event.data.data);
                    }
                    else {
                        window.removeEventListener("message", eventHandler);
                        resolve(event.data.data);
                    }
                }
            };
            window.addEventListener("message", eventHandler, false);
        });
    }
}
exports.ExtensionProvider = ExtensionProvider;
ExtensionProvider._instance = new ExtensionProvider();
//# sourceMappingURL=extensionProvider.js.map