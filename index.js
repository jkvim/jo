const JPromise = (resolve, reject) => {

  this.race = (...resolvers) => {}

  this.all = (...resolvers) => {}

  this.reject = (rejectHandler) => {}

  this.resolve = (resolveHandler) => {}

}

JPromise.prototype.catch = (errorHandler) => {}

JPromise.prototype.finally = (finalHandler) => {}

JPromise.prototype.then = (thenHandler) => {}

