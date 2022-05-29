"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newFilter = void 0;
const thor_devkit_1 = require("thor-devkit");
function newFilter(bits, k) {
    const nBits = bits.length * 8;
    return {
        contains(key) {
            let hash = thor_devkit_1.blake2b256(key).readUInt32BE(0);
            const delta = (hash >>> 17) | (hash << 15 >>> 0);
            for (let i = 0; i < k; i++) {
                const bitPos = hash % nBits;
                const index = bitPos >>> 3;
                const bit = 1 << (bitPos % 8);
                if (!(bits[index] & bit)) {
                    return false;
                }
                hash = (hash + delta) >>> 0;
            }
            return true;
        }
    };
}
exports.newFilter = newFilter;
// // test vector
// const bits = Buffer.from('63b2a4758c74e246c818e080b870437f5327a15cf81172512d98e61c54361a851ba8f108420e6b2b74a4196fb8e7bfe2b96c985e49abddb21c0600063997c93edb7c54921551600bcfc80fb62bfcd045c030b328eb8b5498e06dce610d22e901201226226441b8da094141526e0e58f5baf53064d63d598a4024bf68e0', 'hex')
// const f = newFilter(bits, 6)
// for (let i = 0; i < 100; i++) {
//     if (!f.contains(Buffer.from(i + ''))) {
//         throw new Error('should return true')
//     }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYmxvb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXdDO0FBRXhDLFNBQWdCLFNBQVMsQ0FBQyxJQUFZLEVBQUUsQ0FBUztJQUM3QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUM3QixPQUFPO1FBQ0gsUUFBUSxDQUFDLEdBQVc7WUFDaEIsSUFBSSxJQUFJLEdBQUcsd0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDMUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ2hELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hCLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUE7Z0JBQzNCLE1BQU0sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDLENBQUE7Z0JBQzFCLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFDN0IsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFO29CQUN0QixPQUFPLEtBQUssQ0FBQTtpQkFDZjtnQkFDRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQzlCO1lBQ0QsT0FBTyxJQUFJLENBQUE7UUFDZixDQUFDO0tBQ0osQ0FBQTtBQUNMLENBQUM7QUFsQkQsOEJBa0JDO0FBQ0QsaUJBQWlCO0FBQ2pCLGdTQUFnUztBQUNoUywrQkFBK0I7QUFDL0Isa0NBQWtDO0FBQ2xDLDhDQUE4QztBQUM5QyxnREFBZ0Q7QUFDaEQsUUFBUTtBQUNSLElBQUkifQ==