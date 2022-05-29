"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleWallet = void 0;
const thor_devkit_1 = require("thor-devkit");
/** class simply implements Wallet interface */
class SimpleWallet {
    constructor() {
        this.keys = [];
    }
    get list() {
        return this.keys.map(k => {
            return {
                address: k.address,
                sign(msgHash) {
                    return Promise.resolve(thor_devkit_1.secp256k1.sign(msgHash, k.privateKey));
                }
            };
        });
    }
    /**
     * import private key
     * @param privateKey hex string presented private key
     * @returns address derived from the private key
     */
    import(privateKey) {
        if (privateKey.startsWith('0x')) {
            privateKey = privateKey.slice(2);
        }
        if (!/^[0-9a-f]{64}$/i.test(privateKey)) {
            throw new Error('invalid private key');
        }
        const buf = Buffer.from(privateKey, 'hex');
        const addr = thor_devkit_1.address.fromPublicKey(thor_devkit_1.secp256k1.derivePublicKey(buf));
        this.keys.push({ address: addr, privateKey: buf });
        return addr;
    }
    /**
     * remove corresponding key by given address
     * @param addr address
     * @returns true if found and removed, false otherwise
     */
    remove(addr) {
        const i = this.keys.findIndex(k => k.address === addr.toLowerCase());
        if (i >= 0) {
            this.keys.splice(i, 1);
            return true;
        }
        return false;
    }
}
exports.SimpleWallet = SimpleWallet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXdhbGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaW1wbGUtd2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZDQUFnRDtBQUVoRCwrQ0FBK0M7QUFDL0MsTUFBYSxZQUFZO0lBQXpCO1FBQ3FCLFNBQUksR0FBRyxFQUFpQixDQUFBO0lBNEM3QyxDQUFDO0lBMUNHLElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDckIsT0FBTztnQkFDSCxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87Z0JBQ2xCLElBQUksQ0FBQyxPQUFlO29CQUNoQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsdUJBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO2dCQUNqRSxDQUFDO2FBQ0osQ0FBQTtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBa0I7UUFDNUIsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdCLFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ25DO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUE7U0FDekM7UUFDRCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUMxQyxNQUFNLElBQUksR0FBRyxxQkFBTyxDQUFDLGFBQWEsQ0FBQyx1QkFBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUNsRCxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLElBQVk7UUFDdEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO1FBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN0QixPQUFPLElBQUksQ0FBQTtTQUNkO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztDQUNKO0FBN0NELG9DQTZDQyJ9