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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class RequestPool {
    constructor(initialTimout) {
        this.requests = [];
        this.timeout = initialTimout;
        return this;
    }
    addRequest(url) {
        if (!url)
            return;
        console.log("one in pool");
        this.execute(url);
        return new Promise((resolve) => {
            this.requests.push({
                url,
                resolve,
                tryNumber: 0,
            });
        });
    }
    release(req, res) {
        const idx = this.requests.findIndex((r) => (r.url = req.url));
        this.requests = [
            ...this.requests.slice(0, idx),
            ...this.requests.slice(idx + 1),
        ];
        req.resolve(res);
    }
    execute(url, tm) {
        const timeout = tm || this.timeout;
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            const req = this.requests.find((req) => req.url === url);
            if (!req)
                return;
            try {
                const res = yield (0, axios_1.default)(req.url);
                this.release(req, res);
            }
            catch (e) {
                if (req.tryNumber < 3) {
                    req.tryNumber++;
                    return this.execute(req.url, req.tryNumber * this.timeout * 1.4);
                }
                this.release(req, {});
            }
        }), timeout);
    }
}
exports.default = (initialTimout) => new RequestPool(initialTimout);
