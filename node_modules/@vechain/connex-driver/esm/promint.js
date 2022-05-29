/** class to make promise interruptable */
export class PromInt {
    constructor() {
        this.rejectors = new Set();
    }
    /**
     * interrupt all wrapped promises
     */
    interrupt() {
        const rejectors = this.rejectors;
        this.rejectors = new Set();
        rejectors.forEach(r => r(new InterruptedError()));
    }
    /**
     * wrap the promise
     * @param p the given promise
     * @returns the wrapped promise which will raise InterruptedError on interruption
     */
    wrap(p) {
        return new Promise((resolve, reject) => {
            const rejectors = this.rejectors;
            rejectors.add(reject);
            void p.then(resolve)
                .catch(reject)
                .then(() => rejectors.delete(reject));
        });
    }
}
export class InterruptedError extends Error {
    constructor() {
        super('promise interrupted');
    }
}
InterruptedError.prototype.name = 'InterruptedError';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9taW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLDBDQUEwQztBQUMxQyxNQUFNLE9BQU8sT0FBTztJQUFwQjtRQUNZLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBd0IsQ0FBQTtJQTJCdkQsQ0FBQztJQXpCRzs7T0FFRztJQUNJLFNBQVM7UUFDWixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUUxQixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxJQUFJLENBQUksQ0FBYTtRQUN4QixPQUFPLElBQUksT0FBTyxDQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7WUFDaEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUVyQixLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2lCQUNmLEtBQUssQ0FBQyxNQUFNLENBQUM7aUJBQ2IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtRQUM3QyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxLQUFLO0lBQ3ZDO1FBQ0ksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFDaEMsQ0FBQztDQUNKO0FBRUQsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQSJ9