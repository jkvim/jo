enum State {
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECT = 'REJECT',
};

interface Hanlder {
  onRejected: any;
  onResolved: any;
  resolve: any;
  reject: any;
}

export class Jo {
  handlers = [];
  state = State.PENDING;
  value = null;

  constructor(private fn: Function) {
    this.fn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(val: any) {
    if (typeof val === 'object' && typeof val.then === 'function') {
      val.then(this.resolve.bind(this));
    } else {
      this.value = val;
      this.state = State.FULFILLED;

      setTimeout(() => {
        this.handlers.forEach((callback) => {
          callback(this.value);
        });
      }, 0);
    }
  }

  reject(reason: any) {
    this.value = reason;
    this.state = State.REJECT;
    setTimeout(() => {
      this.handlers.forEach((handler) => {
        this.handle(handler)
      })
    }, 0);
  }

  then(onResolved, onRejected?) {
    return new Jo((resolve, reject) => {
      this.handle({
        onRejected,
        onResolved,
        resolve,
        reject,
      })
    })
  }

  handle(handler: Hanlder) {
    if (this.state === State.PENDING) {
      this.handlers.push(handler);
    }
    else {
      if (handler.onResolved) {
        const result = handler.onResolved(this.value)
        handler.resolve(result)
      } else {
        handler.resolve(this.value);
      }
    }
  }
}