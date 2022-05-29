"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterruptedError = exports.PromInt = void 0;
/** class to make promise interruptable */
class PromInt {
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
exports.PromInt = PromInt;
class InterruptedError extends Error {
    constructor() {
        super('promise interrupted');
    }
}
exports.InterruptedError = InterruptedError;
InterruptedError.prototype.name = 'InterruptedError';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9taW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDBDQUEwQztBQUMxQyxNQUFhLE9BQU87SUFBcEI7UUFDWSxjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQXdCLENBQUE7SUEyQnZELENBQUM7SUF6Qkc7O09BRUc7SUFDSSxTQUFTO1FBQ1osTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7UUFFMUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksSUFBSSxDQUFJLENBQWE7UUFDeEIsT0FBTyxJQUFJLE9BQU8sQ0FBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBO1lBQ2hDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7WUFFckIsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQkFDZixLQUFLLENBQUMsTUFBTSxDQUFDO2lCQUNiLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFDN0MsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUE1QkQsMEJBNEJDO0FBRUQsTUFBYSxnQkFBaUIsU0FBUSxLQUFLO0lBQ3ZDO1FBQ0ksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFDaEMsQ0FBQztDQUNKO0FBSkQsNENBSUM7QUFFRCxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFBIn0=