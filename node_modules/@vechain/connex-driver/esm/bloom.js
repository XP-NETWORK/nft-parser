import { blake2b256 } from "thor-devkit";
export function newFilter(bits, k) {
    const nBits = bits.length * 8;
    return {
        contains(key) {
            let hash = blake2b256(key).readUInt32BE(0);
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
// // test vector
// const bits = Buffer.from('63b2a4758c74e246c818e080b870437f5327a15cf81172512d98e61c54361a851ba8f108420e6b2b74a4196fb8e7bfe2b96c985e49abddb21c0600063997c93edb7c54921551600bcfc80fb62bfcd045c030b328eb8b5498e06dce610d22e901201226226441b8da094141526e0e58f5baf53064d63d598a4024bf68e0', 'hex')
// const f = newFilter(bits, 6)
// for (let i = 0; i < 100; i++) {
//     if (!f.contains(Buffer.from(i + ''))) {
//         throw new Error('should return true')
//     }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYmxvb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQTtBQUV4QyxNQUFNLFVBQVUsU0FBUyxDQUFDLElBQVksRUFBRSxDQUFTO0lBQzdDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0lBQzdCLE9BQU87UUFDSCxRQUFRLENBQUMsR0FBVztZQUNoQixJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzFDLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNoRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QixNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFBO2dCQUMzQixNQUFNLEtBQUssR0FBRyxNQUFNLEtBQUssQ0FBQyxDQUFBO2dCQUMxQixNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQzdCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRTtvQkFDdEIsT0FBTyxLQUFLLENBQUE7aUJBQ2Y7Z0JBQ0QsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUM5QjtZQUNELE9BQU8sSUFBSSxDQUFBO1FBQ2YsQ0FBQztLQUNKLENBQUE7QUFDTCxDQUFDO0FBQ0QsaUJBQWlCO0FBQ2pCLGdTQUFnUztBQUNoUywrQkFBK0I7QUFDL0Isa0NBQWtDO0FBQ2xDLDhDQUE4QztBQUM5QyxnREFBZ0Q7QUFDaEQsUUFBUTtBQUNSLElBQUkifQ==