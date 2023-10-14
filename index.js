// @ts-check
"use strict"

export function init() {
  const OkCls = (() =>
    /** @template T */

    class Ok {
      get isOk() {
        return /** @type {const} */ (true)
      }

      get err() {
        return undefined
      }

      /** @param {T} value */
      constructor(value) {
        this.ok = value
      }
    })()

  const ErrCls = (() =>
    /** @template E */
    class Err {
      get isOk() {
        return /** @type {const} */ (false)
      }

      get ok() {
        return undefined
      }

      /** @param {E} value */
      constructor(value) {
        this.err = value
      }
    })()

  globalThis.Ok = function Ok(value = null) {
    return Object.freeze(new OkCls(value))
  }

  globalThis.Err = function Err(value) {
    return Object.freeze(new ErrCls(value))
  }
}

/**
 * @param {any} arg0
 * @param {any} [arg1]
 * @returns {(cb: (...args: any[]) => any) => (...args: any[]) => any}
 */
export function intoResult(arg0, arg1) {
  const isAsync = typeof arg0 === "boolean" ? arg0 ?? false : arg1 ?? false
  const thisArg = typeof arg0 !== "boolean" ? arg0 : undefined
  return (fallible) => {
    if (isAsync) {
      if (thisArg === undefined) {
        return (...args) =>
          /** @type {Promise<any>} */ (fallible(...args))
            .then(globalThis.Ok)
            .catch(globalThis.Err)
      } else {
        return (...args) =>
          /** @type {Promise<any>} */ (fallible.apply(thisArg, args))
            .then(globalThis.Ok)
            .catch(globalThis.Err)
      }
    } else {
      if (thisArg === undefined) {
        return (...args) => {
          try {
            const result = fallible(...args)
            return globalThis.Ok(result)
          } catch (e) {
            return globalThis.Err(e)
          }
        }
      } else {
        return (...args) => {
          try {
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
