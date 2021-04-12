interface Subject {
  request(): void;
}

class RealSubject implements Subject {
  public request(): void {
    console.log("RealSubject: Handling request.");
  }
}

class Proxy implements Subject {
  private realSubject: RealSubject;
  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log("Proxy: Checking access prior to firing a real request.");

    return true;
  }

  private logAccess(): void {
    console.log("Proxy: Logging the time of request.");
  }
}

//JS variant
const networkFetch = { prop1: "Awesome1", prop2: "Awesome2" };

const cache = new Set();
const handler = {
  get(target, context, args) {
    const url = args[0];
    if (cache.has(url)) {
      return `${url} - ответ из кеша`;
    }
    cache.add(url);
    return;
  },
};

const proxiedFetch = new Proxy(networkFetch, handler);

export {};
