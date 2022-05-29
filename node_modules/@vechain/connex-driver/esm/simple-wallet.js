import { secp256k1, address } from 'thor-devkit';
/** class simply implements Wallet interface */
export class SimpleWallet {
    constructor() {
        this.keys = [];
    }
    get list() {
        return this.keys.map(k => {
            return {
                address: k.address,
                sign(msgHash) {
                    return Promise.resolve(secp256k1.sign(msgHash, k.privateKey));
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
        const addr = address.fromPublicKey(secp256k1.derivePublicKey(buf));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXdhbGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaW1wbGUtd2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFBO0FBRWhELCtDQUErQztBQUMvQyxNQUFNLE9BQU8sWUFBWTtJQUF6QjtRQUNxQixTQUFJLEdBQUcsRUFBaUIsQ0FBQTtJQTRDN0MsQ0FBQztJQTFDRyxJQUFJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3JCLE9BQU87Z0JBQ0gsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO2dCQUNsQixJQUFJLENBQUMsT0FBZTtvQkFDaEIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO2dCQUNqRSxDQUFDO2FBQ0osQ0FBQTtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBa0I7UUFDNUIsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdCLFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ25DO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUE7U0FDekM7UUFDRCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUMxQyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDbEQsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxJQUFZO1FBQ3RCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtRQUNwRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDdEIsT0FBTyxJQUFJLENBQUE7U0FDZDtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2hCLENBQUM7Q0FDSiJ9