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
exports.Driver = void 0;
const driver_no_vendor_1 = require("./driver-no-vendor");
const thor_devkit_1 = require("thor-devkit");
const crypto_1 = require("crypto");
/** class fully implements DriverInterface */
class Driver extends driver_no_vendor_1.DriverNoVendor {
    constructor(net, genesis, initialHead, wallet) {
        super(net, genesis, initialHead);
        this.wallet = wallet;
        /** params for tx construction */
        this.txParams = {
            expiration: 18,
            gasPriceCoef: 0
        };
    }
    /**
     * create driver instance
     * it will fetch config(genesis, head) via net as construction params
     * @param net
     * @param wallet
     */
    static connect(net, wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            const genesis = yield net.http('GET', 'blocks/0');
            const best = yield net.http('GET', 'blocks/best', {
                validateResponseHeader: headers => {
                    const xgid = headers['x-genesis-id'];
                    if (xgid && xgid !== genesis.id) {
                        throw new Error(`responded 'x-genesis-id' not matched`);
                    }
                }
            });
            return new Driver(net, genesis, {
                id: best.id,
                number: best.number,
                timestamp: best.timestamp,
                parentID: best.parentID,
                txsFeatures: best.txsFeatures,
                gasLimit: best.gasLimit
            }, wallet);
        });
    }
    signTx(msg, options) {
        return __awaiter(this, void 0, void 0, function* () {
            options.onAccepted && options.onAccepted();
            const key = this.findKey(options.signer);
            const clauses = msg.map(c => ({
                to: c.to ? c.to.toLowerCase() : null,
                value: c.value.toString().toLowerCase(),
                data: (c.data || '0x').toLowerCase(),
            }));
            const gas = options.gas ||
                (yield this.estimateGas(clauses, key.address));
            const txBody = {
                chainTag: Number.parseInt(this.genesis.id.slice(-2), 16),
                blockRef: this.head.id.slice(0, 18),
                expiration: this.txParams.expiration,
                clauses,
                gasPriceCoef: this.txParams.gasPriceCoef,
                gas,
                dependsOn: options.dependsOn || null,
                nonce: '0x' + crypto_1.randomBytes(8).toString('hex')
            };
            let tx;
            if (options.delegator) {
                const delegatedTx = new thor_devkit_1.Transaction(Object.assign(Object.assign({}, txBody), { reserved: { features: 1 /* vip191 */ } }));
                const originSig = yield key.sign(delegatedTx.signingHash());
                const unsigned = {
                    raw: '0x' + delegatedTx.encode().toString('hex'),
                    origin: key.address
                };
                try {
                    const result = yield this.net.http('POST', options.delegator.url, { body: unsigned });
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    delegatedTx.signature = Buffer.concat([originSig, Buffer.from(result.signature.slice(2), 'hex')]);
                    tx = delegatedTx;
                }
                catch (err) {
                    // tslint:disable-next-line: no-console
                    console.warn('tx delegation error: ', err);
                    // fallback to non-vip191 tx
                }
            }
            if (!tx) {
                tx = new thor_devkit_1.Transaction(txBody);
                tx.signature = yield key.sign(tx.signingHash());
            }
            const raw = '0x' + tx.encode().toString('hex');
            if (this.onTxCommit) {
                this.onTxCommit({
                    id: tx.id,
                    raw,
                    resend: () => __awaiter(this, void 0, void 0, function* () {
                        yield this.sendTx(raw);
                    })
                });
            }
            yield this.sendTx(raw);
            return {
                txid: tx.id,
                signer: key.address
            };
        });
    }
    signCert(msg, options) {
        return __awaiter(this, void 0, void 0, function* () {
            options.onAccepted && options.onAccepted();
            const key = this.findKey(options.signer);
            const annex = {
                domain: 'localhost',
                timestamp: this.head.timestamp,
                signer: key.address
            };
            const unsigned = thor_devkit_1.Certificate.encode(Object.assign(Object.assign({}, msg), annex));
            const signature = yield key.sign(thor_devkit_1.blake2b256(unsigned));
            return {
                annex,
                signature: '0x' + signature.toString('hex')
            };
        });
    }
    findKey(addr) {
        if (this.wallet) {
            const keys = this.wallet.list;
            const key = addr ? keys.find(k => k.address === addr) : keys[0];
            if (key) {
                return key;
            }
        }
        throw new Error('empty wallet');
    }
    sendTx(raw) {
        return this.httpPost('transactions', { raw });
    }
    estimateGas(clauses, caller) {
        return __awaiter(this, void 0, void 0, function* () {
            const outputs = yield this.explain({
                clauses,
                caller,
            }, this.head.id);
            const execGas = outputs.reduce((sum, out) => sum + out.gasUsed, 0);
            const intrinsicGas = thor_devkit_1.Transaction.intrinsicGas(clauses);
            return intrinsicGas + (execGas ? (execGas + 15000) : 0);
        });
    }
}
exports.Driver = Driver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RyaXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSx5REFBbUQ7QUFFbkQsNkNBQWtFO0FBQ2xFLG1DQUFvQztBQUVwQyw2Q0FBNkM7QUFDN0MsTUFBYSxNQUFPLFNBQVEsaUNBQWM7SUF5Q3RDLFlBQ0ksR0FBUSxFQUNSLE9BQTBCLEVBQzFCLFdBQXdDLEVBQ3ZCLE1BQWU7UUFFaEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFGZixXQUFNLEdBQU4sTUFBTSxDQUFTO1FBVnBDLGlDQUFpQztRQUMxQixhQUFRLEdBQUc7WUFDZCxVQUFVLEVBQUUsRUFBRTtZQUNkLFlBQVksRUFBRSxDQUFDO1NBQ2xCLENBQUE7SUFTRCxDQUFDO0lBL0NEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFPLE9BQU8sQ0FBQyxHQUFRLEVBQUUsTUFBZTs7WUFDakQsTUFBTSxPQUFPLEdBQXNCLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUE7WUFDcEUsTUFBTSxJQUFJLEdBQXNCLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFO2dCQUNqRSxzQkFBc0IsRUFBRSxPQUFPLENBQUMsRUFBRTtvQkFDOUIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFBO29CQUNwQyxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssT0FBTyxDQUFDLEVBQUUsRUFBRTt3QkFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO3FCQUMxRDtnQkFDTCxDQUFDO2FBQ0osQ0FBQyxDQUFBO1lBRUYsT0FBTyxJQUFJLE1BQU0sQ0FDYixHQUFHLEVBQ0gsT0FBTyxFQUNQO2dCQUNJLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDWCxNQUFN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