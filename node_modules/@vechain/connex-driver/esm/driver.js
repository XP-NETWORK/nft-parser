var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DriverNoVendor } from './driver-no-vendor';
import { Transaction, Certificate, blake2b256 } from 'thor-devkit';
import { randomBytes } from 'crypto';
/** class fully implements DriverInterface */
export class Driver extends DriverNoVendor {
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
                nonce: '0x' + randomBytes(8).toString('hex')
            };
            let tx;
            if (options.delegator) {
                const delegatedTx = new Transaction(Object.assign(Object.assign({}, txBody), { reserved: { features: 1 /* vip191 */ } }));
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
                tx = new Transaction(txBody);
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
            const unsigned = Certificate.encode(Object.assign(Object.assign({}, msg), annex));
            const signature = yield key.sign(blake2b256(unsigned));
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
            const intrinsicGas = Transaction.intrinsicGas(clauses);
            return intrinsicGas + (execGas ? (execGas + 15000) : 0);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RyaXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBQ2xFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFcEMsNkNBQTZDO0FBQzdDLE1BQU0sT0FBTyxNQUFPLFNBQVEsY0FBYztJQXlDdEMsWUFDSSxHQUFRLEVBQ1IsT0FBMEIsRUFDMUIsV0FBd0MsRUFDdkIsTUFBZTtRQUVoQyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUZmLFdBQU0sR0FBTixNQUFNLENBQVM7UUFWcEMsaUNBQWlDO1FBQzFCLGFBQVEsR0FBRztZQUNkLFVBQVUsRUFBRSxFQUFFO1lBQ2QsWUFBWSxFQUFFLENBQUM7U0FDbEIsQ0FBQTtJQVNELENBQUM7SUEvQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQU8sT0FBTyxDQUFDLEdBQVEsRUFBRSxNQUFlOztZQUNqRCxNQUFNLE9BQU8sR0FBc0IsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQTtZQUNwRSxNQUFNLElBQUksR0FBc0IsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUU7Z0JBQ2pFLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxFQUFFO29CQUM5QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUE7b0JBQ3BDLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxPQUFPLENBQUMsRUFBRSxFQUFFO3dCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUE7cUJBQzFEO2dCQUNM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