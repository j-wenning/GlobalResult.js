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

type Fn = (...args: any[]) => any

export declare global {
  type Result<T, E> = Ok<T> | Err<E>

  function Ok<T>(value: T): Ok<T>

  function Err<E>(error: E): Err<E>
}

export function intoResult<E>(
  isAsync: true,
): <A extends any[], T>(
  fallible: (...args: A) => Promise<T>,
) => (...args: A) => Promise<Result<Awaited<T>, E>>

export function intoResult<E>(
  isAsync?: false,
): <A extends any[], T>(
  fallible: (...args: A) => T,
) => (...args: A) => Result<T, E>

export function intoResult<E>(
  thisArg: any,
  isAsync: true,
): <C extends typeof thisArg, A extends any[], T>(
  fallible: ThisParameterType<C> & ((...args: A) => Promise<T>),
) => (...args: A) => Promise<Result<Awaited<T>, E>>

export function intoResult<E>(
  thisArg: any,
  isAsync?: false,
): <C extends typeof thisArg, A extends any[], T>(
  fallible: ThisParameterType<C> & ((...args: A) => T),
) => (...args: A) => Result<T, E>

export function init(): void

export default init
