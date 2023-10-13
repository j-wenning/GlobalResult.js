// @ts-check
"use strict"

export function init() {
  const OkCls = (() =>
    /** @template T */

    class Ok {
      /** @type {T} */
      value

      get isOk() {
        return /** @type {const} */ (true)
      }

      get ok() {
        return this.value
      }

      /** @param {T} value */
      constructor(value) {
        this.value = value
      }
    })()

  const ErrCls = (() =>
    /** @template E */
    class Err {
      /** @type {E} */
      value

      get isOk() {
        return /** @type {const} */ (false)
      }

      get err() {
        return this.value
      }

      /** @param {E} value */
      constructor(value) {
        this.value = value
      }
    })()

  globalThis.Ok = function Ok(value) {
    return Object.freeze(new OkCls(value))
  }

  globalThis.Err = function Err(value) {
    return Object.freeze(new ErrCls(value))
  }

  // @ts-expect-error cannot resolve return type
  globalThis.intoResult = function intoResult(isAsync, thisArg) {
    return (fallible) => {
      if (isAsync) {
        if (thisArg === undefined) {
          return (...args) =>
            /** @type {Promise<any>} */ (
              // @ts-expect-error cannot resolve args for fallible
              fallible(...args)
            )
              .then(globalThis.Ok)
              .catch(globalThis.Err)
        } else {
          return (...args) =>
            /** @type {Promise<any>} */ (
              // @ts-expect-error - cannot resolve thisArg or args for fallible
              fallible.apply(thisArg, args)
            )
              .then(globalThis.Ok)
              .catch(globalThis.Err)
        }
      } else {
        if (thisArg === undefined) {
          try {
            // @ts-expect-error - cannot resolve args for fallible
            const result = fallible(...args)
            return globalThis.Ok(result)
          } catch (e) {
            return globalThis.Err(e)
          }
        } else {
          try {
            // @ts-expect-error - cannot resolve thisArg or args for fallible
            const result = fallible.apply(thisArg, args)
            return globalThis.Ok(result)
          } catch (e) {
            return globalThis.Err(e)
          }
        }
      }
    }
  }
}

export default init
