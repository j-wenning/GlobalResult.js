export declare global {
  type Ok<T> = {
    readonly isOk: true
    readonly ok: T
    readonly err: undefined
  }

  type Err<E> = {
    readonly isOk: false
    readonly ok: undefined
    readonly err: E
  }

  type Result<T, E> = Ok<T> | Err<E>

  function Ok(): Ok<null>

  function Ok<T>(value: T): Ok<T>

  function Err<E>(error: E): Err<E>
}

export function init(): void

export default init
