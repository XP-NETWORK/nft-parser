"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleWebSocketReader = void 0;
const WebSocket = require("isomorphic-ws");
class SimpleWebSocketReader {
    constructor(url, timeout = 30 * 1000) {
        this.timeout = timeout;
        this.callbacks = [];
        this.ws = new WebSocket(url);
        this.ws.onmessage = ev => {
            try {
                const cbs = this.callbacks;
                this.callbacks = [];
                cbs.forEach(cb => cb(ev.data));
            }
            catch (err) {
                this.setError(err);
                this.ws.close();
            }
        };
        this.ws.onerror = ev => {
            this.setError(ev.error);
            this.ws.close();
        };
        this.ws.onclose = () => {
            this.setError(new Error('closed'));
        };
    }
    read() {
        return new Promise((resolve, reject) => {
            if (this.error) {
                return reject(this.error);
            }
            const timer = setTimeout(() => {
                reject(new Error('ws read timeout'));
            }, this.timeout);
            this.callbacks.push((data, err) => {
                clearTimeout(timer);
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    }
    close() {
        this.ws.close();
    }
    setError(err) {
        if (!this.error) {
            this.error = err;
            const cbs = this.callbacks;
            this.callbacks = [];
            cbs.forEach(cb => cb(null, err));
        }
    }
}
exports.SimpleWebSocketReader = SimpleWebSocketReader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXdlYnNvY2tldC1yZWFkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc2ltcGxlLXdlYnNvY2tldC1yZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTBDO0FBRzFDLE1BQWEscUJBQXFCO0lBSzlCLFlBQVksR0FBVyxFQUFtQixVQUFVLEVBQUUsR0FBRyxJQUFJO1FBQW5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFIckQsY0FBUyxHQUFHLEVBQStDLENBQUE7UUFJL0QsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUM1QixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsRUFBRTtZQUNyQixJQUFJO2dCQUNBLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO2dCQUNuQixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO2FBQ2pDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTthQUNsQjtRQUNMLENBQUMsQ0FBQTtRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3ZCLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDbkIsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtRQUN0QyxDQUFDLENBQUE7SUFDTCxDQUFDO0lBRU0sSUFBSTtRQUNQLE9BQU8sSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNaLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUM1QjtZQUVELE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUE7WUFDeEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUVoQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDOUIsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNuQixJQUFJLEdBQUcsRUFBRTtvQkFDTCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtpQkFDckI7Z0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2pCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sS0FBSztRQUNSLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDbkIsQ0FBQztJQUVPLFFBQVEsQ0FBQyxHQUFVO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUE7WUFFaEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtZQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtZQUNuQixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQ25DO0lBQ0wsQ0FBQztDQUNKO0FBM0RELHNEQTJEQyJ9