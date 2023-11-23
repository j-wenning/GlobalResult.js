// @ts-check
"use strict"

export function init() {
  const OkCls = (() =>
    /** @template T */

    class Ok {
      isOk = /** @type {const} */ (true)

      get ok() {
        return this.value
      }

      get err() {
        return undefined
      }

      /** @param {T} value */
      constructor(value) {
        this.value = value
      }
    })()

  const ErrCls = (() =>
    /** @template E */
    class Err {
      isOk = /** @type {const} */ (false)

      get ok() {
        return undefined
      }

      get err() {
        return this.value
      }

      /** @param {E} value */
      constructor(value) {
        this.value = value
      }
    })()

  /**
   * @template T
   * @param {[T] | []} values
   */
  globalThis.Ok = function Ok(...values) {
    return Object.freeze(new OkCls(values.length === 0 ? null : values[0]))
  }

  globalThis.Err = function Err(value) {
    return Object.freeze(new ErrCls(value))
  }
}

export default init
