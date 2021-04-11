const Promise = require('./core')
module.exports = Promise

// If value is a promise, return this promise
// else just resolve this value and return a new promise
Promise.resolve = (value) => {
  if (value instanceof Promise)
    return value
  return new Promise(r => r(value))
}

// Just to reject a promise with reason
Promise.reject = (reason) => {
  return new Promise((rs, rj) => rj(reason))
}

Promise.all = (promiseArray) => {
  if (!Array.isArray(promiseArray))
    throw new TypeError("params is not a Array")

  let resolvePromiseCount = 0
  const promiseResults = []

  return new Promise((resolve, reject) => {
    for (const promise of promiseArray) {
      promise.then((data) => {
        resolvePromiseCount += 1
        promiseResults.push(data)
        if (promiseResults.length === promiseArray.length)
          resolve(promiseResults)
      })
      .catch((err) => {
        reject(err)
      })
    }
  })
}

Promise.race = (promiseArray) => {
  if (!Array.isArray(promiseArray))
    throw new TypeError("params is not a Array")

  return new Promise((resolve, reject) => {
    for (const promise of promiseArray) {
      promise.then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
    }
  })
}