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
exports.Cache = void 0;
const LRU = require("lru-cache");
const bignumber_js_1 = require("bignumber.js");
const bloom_1 = require("./bloom");
const WINDOW_LEN = 12;
class Cache {
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
        this.window.push(Object.assign(Object.assign({}, head), { bloom: bloom ? bloom_1.newFilter(Buffer.from(bloom.bits.slice(2), 'hex'), bloom.k) : undefined, block, accounts: new Map(), txs: new Map(), receipts: new Map(), tied: new Map() }));
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
exports.Cache = Cache;
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
        return '0x' + new bignumber_js_1.default(this.obj.balance)
            .times(timestamp - this.initTimestamp)
            .times(ENERGY_GROWTH_RATE)
            .dividedToIntegerBy(1e18)
            .plus(this.obj.energy)
            .toString(16);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBQ2hDLCtDQUFvQztBQUNwQyxtQ0FBbUM7QUFFbkMsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFBO0FBWXJCLE1BQWEsS0FBSztJQUFsQjtRQUNxQixpQkFBWSxHQUFHO1lBQzVCLE1BQU0sRUFBRSxJQUFJLEdBQUcsQ0FBcUMsR0FBRyxDQUFDO1lBQ3hELEdBQUcsRUFBRSxJQUFJLEdBQUcsQ0FBa0MsR0FBRyxDQUFDO1lBQ2xELFFBQVEsRUFBRSxJQUFJLEdBQUcsQ0FBMEMsR0FBRyxDQUFDO1NBQ2xFLENBQUE7UUFDZ0IsV0FBTSxHQUFXLEVBQUUsQ0FBQTtJQXNOeEMsQ0FBQztJQXBOVSxjQUFjLENBQ2pCLElBQWdDLEVBQ2hDLEtBQW1DLEVBQ25DLEtBQXlCO1FBRXpCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDL0MsSUFBSSxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BCLE9BQU07YUFDVDtZQUNELElBQUksR0FBRyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMxQixNQUFLO2FBQ1I7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFBO1NBQ3BCO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlDQUNULElBQUksS0FDUCxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxpQkFBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FB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