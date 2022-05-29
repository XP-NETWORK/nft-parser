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
exports.TransactionWatcher = void 0;
const asyncTimer_1 = require("./asyncTimer");
const logger_1 = require("./logger");
const errors_1 = require("./errors");
/**
 * TransactionWatcher allows one to continuously watch (monitor), by means of polling, the status of a given transaction.
 */
class TransactionWatcher {
    /**
     *
     * @param fetcher The transaction fetcher
     * @param pollingInterval The polling interval, in milliseconds
     * @param timeout The timeout, in milliseconds
     */
    constructor(fetcher, pollingInterval = TransactionWatcher.DefaultPollingInterval, timeout = TransactionWatcher.DefaultTimeout) {
        this.fetcher = new TransactionFetcherWithTracing(fetcher);
        this.pollingInterval = pollingInterval;
        this.timeout = timeout;
    }
    /**
     * Waits until the transaction reaches the "pending" status.
     */
    awaitPending(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const isPending = (transaction) => transaction.status.isPending();
            const doFetch = () => __awaiter(this, void 0, void 0, function* () { return yield this.fetcher.getTransaction(transaction.getHash().hex()); });
            const errorProvider = () => new errors_1.ErrExpectedTransactionStatusNotReached();
            return this.awaitConditionally(isPending, doFetch, errorProvider);
        });
    }
    /**
      * Waits until the transaction is completely processed.
      */
    awaitCompleted(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const isCompleted = (transactionOnNetwork) => transactionOnNetwork.isCompleted;
            const doFetch = () => __awaiter(this, void 0, void 0, function* () { return yield this.fetcher.getTransaction(transaction.getHash().hex()); });
            const errorProvider = () => new errors_1.ErrExpectedTransactionStatusNotReached();
            return this.awaitConditionally(isCompleted, doFetch, errorProvider);
        });
    }
    awaitAllEvents(transaction, events) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundAllEvents = (transactionOnNetwork) => {
                const allEventIdentifiers = this.getAllTransactionEvents(transactionOnNetwork).map(event => event.identifier);
                const allAreFound = events.every(event => allEventIdentifiers.includes(event));
                return allAreFound;
            };
            const doFetch = () => __awaiter(this, void 0, void 0, function* () { return yield this.fetcher.getTransaction(transaction.getHash().hex()); });
            const errorProvider = () => new errors_1.ErrExpectedTransactionEventsNotFound();
            return this.awaitConditionally(foundAllEvents, doFetch, errorProvider);
        });
    }
    awaitAnyEvent(transaction, events) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundAnyEvent = (transactionOnNetwork) => {
                const allEventIdentifiers = this.getAllTransactionEvents(transactionOnNetwork).map(event => event.identifier);
                const anyIsFound = events.find(event => allEventIdentifiers.includes(event)) != undefined;
                return anyIsFound;
            };
            const doFetch = () => __awaiter(this, void 0, void 0, function* () { return yield this.fetcher.getTransaction(transaction.getHash().hex()); });
            const errorProvider = () => new errors_1.ErrExpectedTransactionEventsNotFound();
            return this.awaitConditionally(foundAnyEvent, doFetch, errorProvider);
        });
    }
    awaitOnCondition(transaction, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const doFetch = () => __awaiter(this, void 0, void 0, function* () { return yield this.fetcher.getTransaction(transaction.getHash().hex()); });
            const errorProvider = () => new errors_1.ErrExpectedTransactionStatusNotReached();
            return this.awaitConditionally(condition, doFetch, errorProvider);
        });
    }
    awaitConditionally(isSatisfied, doFetch, createError) {
        return __awaiter(this, void 0, void 0, function* () {
            const periodicTimer = new asyncTimer_1.AsyncTimer("watcher:periodic");
            const timeoutTimer = new asyncTimer_1.AsyncTimer("watcher:timeout");
            let stop = false;
            let fetchedData = undefined;
            let satisfied = false;
            timeoutTimer.start(this.timeout).finally(() => {
                timeoutTimer.stop();
                stop = true;
            });
            while (!stop) {
                yield periodicTimer.start(this.pollingInterval);
                try {
                    fetchedData = yield doFetch();
                    satisfied = isSatisfied(fetchedData);
                    if (satisfied || stop) {
                        break;
                    }
                }
                catch (error) {
                    logger_1.Logger.debug("TransactionWatcher.awaitConditionally(): cannot (yet) fetch data.");
                    if (!(error instanceof errors_1.Err)) {
                        throw error;
                    }
                }
            }
            if (!timeoutTimer.isStopped()) {
                timeoutTimer.stop();
            }
            if (!fetchedData || !satisfied) {
                throw createError();
            }
            return fetchedData;
        });
    }
    getAllTransactionEvents(transaction) {
        const result = [...transaction.logs.events];
        for (const resultItem of transaction.contractResults.items) {
            result.push(...resultItem.logs.events);
        }
        return result;
    }
}
exports.TransactionWatcher = TransactionWatcher;
TransactionWatcher.DefaultPollingInterval = 6000;
TransactionWatcher.DefaultTimeout = TransactionWatcher.DefaultPollingInterval * 15;
TransactionWatcher.NoopOnStatusReceived = (_) => { };
class TransactionFetcherWithTracing {
    constructor(fetcher) {
        this.fetcher = fetcher;
    }
    getTransaction(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.Logger.debug(`transactionWatcher, getTransaction(${txHash})`);
            return yield this.fetcher.getTransaction(txHash);
        });
    }
}
//# sourceMappingURL=transactionWatcher.js.map