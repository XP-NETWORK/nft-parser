import axios, { AxiosResponse } from "axios";
//import resolve

interface Request {
  url: string;
  resolve: (value: unknown) => void;
  tryNumber: number;
}

class RequestPool {
  requests: Request[] = [];
  timeout;

  constructor(initialTimout: number) {
    this.timeout = initialTimout;
    return this;
  }

  addRequest(url: string) {
    if (!url) return;
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

  release(req: Request, res: AxiosResponse<any, any> | {}) {
    const idx = this.requests.findIndex((r) => (r.url = req.url));

    this.requests = [
      ...this.requests.slice(0, idx),
      ...this.requests.slice(idx + 1),
    ];
    req.resolve(res);
  }

  execute(url: string) {
    setTimeout(async () => {
      const req = this.requests.find((req) => req.url === url);
      if (!req) return;

      try {
        const res = await axios(req.url);

        this.release(req, res);
      } catch (e) {
        if (req.tryNumber < 3) {
          req.tryNumber++;
          return this.execute(req.url);
        }

        this.release(req, {});
      }
    }, this.timeout);
  }
}

export default (initialTimout: number) => new RequestPool(initialTimout);
