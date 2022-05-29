var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as LRU from 'lru-cache';
import BigNumber from 'bignumber.js';
import { newFilter } from './bloom';
const WINDOW_LEN = 12;
export class Cache {
    constructor() {
        this.irreversible = {
            blocks: new LRU(256),
            txs: new LRU(512),
            receipts: new LRU(512)
        };
        this.window = [];
    }
    handleNewBlock(head, bloom, block) {
        while (this.window.length > 0) {
            const top = this.window[this.window.length - 1];
            if (top.id === head.id) {
                return;
            }
            if (top.id === head.parentID) {
                break;
            }
            this.window.pop();
        }
        this.window.push(Object.assign(Object.assign({}, head), { bloom: bloom ? newFilter(Buffer.from(bloom.bits.slice(2), 'hex'), bloom.k) : undefined, block, accounts: new Map(), txs: new Map(), receipts: new Map(), tied: new Map() }));
        // shift out old slots and move cached items into frozen cache
        while (this.window.length > WINDOW_LEN) {
            const bottom = this.window.shift();
            bottom.txs.forEach((v, k) => this.irreversible.txs.set(k, v));
            bottom.receipts.forEach((v, k) => this.irreversible.receipts.set(k, v));
            if (bottom.block) {
                this.irreversible.blocks.set(bottom.block.id, bottom.block);
                this.irreversible.blocks.set(bottom.block.number, bottom.block);
            }
        }
    }
    getBlock(revision, fetch) {
        return __awaiter(this, void 0, void 0, function* () {
            let block = this.irreversible.blocks.get(revision) || null;
            if (block) {
                return block;
            }
            const { slot } = this.findSlot(revision);
            if (slot && slot.block) {
                return slot.block;
            }
            block = yield fetch();
            if (block) {
                if (slot && slot.id === block.id) {
                    slot.block = block;
                }
                if (this.isIrreversible(block.number)) {
                    this.irreversible.blocks.set(block.id, block);
                    if (block.isTrunk) {
                        this.irreversible.blocks.set(block.number, block);
                    }
                }
            }
            return block;
        });
    }
    getTx(txid, fetch) {
        return __awaiter(this, void 0, void 0, function* () {
            let tx = this.irreversible.txs.get(txid) || null;
            if (tx) {
                return tx;
            }
            for (const slot of this.window) {
                tx = slot.txs.get(txid) || null;
                if (tx) {
                    return tx;
                }
            }
            tx = yield fetch();
            if (tx && tx.meta) { // only cache non-pending tx
                const { slot } = this.findSlot(tx.meta.blockID);
                if (slot) {
                    slot.txs.set(txid, tx);
                }
                if (this.isIrreversible(tx.meta.blockNumber)) {
                    this.irreversible.txs.set(txid, tx);
                }
            }
            return tx;
        });
    }
    getReceipt(txid, fetch) {
        return __awaiter(this, void 0, void 0, function* () {
            let receipt = this.irreversible.receipts.get(txid) || null;
            if (receipt) {
                return receipt;
            }
            for (const slot of this.window) {
                receipt = slot.receipts.get(txid) || null;
                if (receipt) {
                    return receipt;
                }
            }
            receipt = yield fetch();
            if (receipt) {
                const { slot } = this.findSlot(receipt.meta.blockID);
                if (slot) {
                    slot.receipts.set(txid, receipt);
                }
                if (this.isIrreversible(receipt.meta.blockNumber)) {
                    this.irreversible.receipts.set(txid, receipt);
                }
            }
            return receipt;
        });
    }
    getAccount(addr, revision, fetch) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = this.findSlot(revision);
            for (let i = found.index; i >= 0; i--) {
                const slot = this.window[i];
                const acc = slot.accounts.get(addr);
                if (acc) {
                    if (i !== found.index) {
                        found.slot.accounts.set(addr, acc);
                    }
                    return acc.snapshot(found.slot.timestamp);
                }
                if (!slot.bloom || testBytesHex(slot.bloom, addr)) {
                    // account might be dirty
                    break;
                }
            }
            const accObj = yield fetch();
            if (found.slot) {
                found.slot.accounts.set(addr, new Account(accObj, found.slot.timestamp));
            }
            return accObj;
        });
    }
    /**
     * get cached entry which is tied to a batch of addresses
     * @param key the cache key
     * @param revision block id where cache bound to
     * @param fetch to fetch value when cache missing
     * @param hints array of tied addresses, as the gist to invalidate cache key. undefined means the key is always
     * invalidated on different revision.
     */
    getTied(key, revision, fetch, hints) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = this.findSlot(revision);
            for (let i = found.index; i >= 0; i--) {
                const slot = this.window[i];
                const v = slot.tied.get(key);
                if (v) {
                    if (i !== found.index) {
                        found.slot.tied.set(key, v);
                    }
                    return v;
                }
                if (!slot.bloom || !hints) {
                    break;
                }
                // if hints.length === 0, never invalidate cache
                if (hints.some(t => testBytesHex(slot.bloom, t))) {
                    // might be dirty
                    break;
                }
            }
            const value = yield fetch();
            if (found.slot) {
                found.slot.tied.set(key, value);
            }
            return value;
        });
    }
    findSlot(revision) {
        const index = this.window.findIndex(s => s.id === revision || s.number === revision);
        if (index >= 0) {
            return { slot: this.window[index], index };
        }
        return { index };
    }
    isIrreversible(n) {
        if (this.window.length > 0) {
            return n < this.window[this.window.length - 1].number - WINDOW_LEN;
        }
        return false;
    }
}
function testBytesHex(filter, hex) {
    let buf = Buffer.from(hex.slice(2), 'hex');
    const nzIndex = buf.findIndex(v => v !== 0);
    if (nzIndex < 0) {
        buf = Buffer.alloc(0);
    }
    else {
        buf = buf.slice(nzIndex);
    }
    return filter.contains(buf);
}
const ENERGY_GROWTH_RATE = 5000000000;
class Account {
    constructor(obj, initTimestamp) {
        this.obj = obj;
        this.initTimestamp = initTimestamp;
    }
    snapshot(timestamp) {
        return Object.assign(Object.assign({}, this.obj), { energy: this.energyAt(timestamp) });
    }
    energyAt(timestamp) {
        if (timestamp < this.initTimestamp) {
            return this.obj.energy;
        }
        return '0x' + new BigNumber(this.obj.balance)
            .times(timestamp - this.initTimestamp)
            .times(ENERGY_GROWTH_RATE)
            .dividedToIntegerBy(1e18)
            .plus(this.obj.energy)
            .toString(16);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLEdBQUcsTUFBTSxXQUFXLENBQUE7QUFDaEMsT0FBTyxTQUFTLE1BQU0sY0FBYyxDQUFBO0FBQ3BDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFFbkMsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFBO0FBWXJCLE1BQU0sT0FBTyxLQUFLO0lBQWxCO1FBQ3FCLGlCQUFZLEdBQUc7WUFDNUIsTUFBTSxFQUFFLElBQUksR0FBRyxDQUFxQyxHQUFHLENBQUM7WUFDeEQsR0FBRyxFQUFFLElBQUksR0FBRyxDQUFrQyxHQUFHLENBQUM7WUFDbEQsUUFBUSxFQUFFLElBQUksR0FBRyxDQUEwQyxHQUFHLENBQUM7U0FDbEUsQ0FBQTtRQUNnQixXQUFNLEdBQVcsRUFBRSxDQUFBO0lBc054QyxDQUFDO0lBcE5VLGNBQWMsQ0FDakIsSUFBZ0MsRUFDaEMsS0FBbUMsRUFDbkMsS0FBeUI7UUFFekIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUMvQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDcEIsT0FBTTthQUNUO1lBQ0QsSUFBSSxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzFCLE1BQUs7YUFDUjtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUE7U0FDcEI7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksaUNBQ1QsSUFBSSxLQUNQLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FB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