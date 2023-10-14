# GlobalResult.js

## Description

A simple utility for injecting a Result type into the global namespace

## API

### `Ok` (Global)

Wraps a value in an `Ok` class.

### `Err` (Global)

Wraps a value in an `Err` class.

### `intoResult`

Wraps a function that may throw with a `Result` (`Ok` or `Err` class).

## Examples

### Returning a result and checking for errors

```ts
function risky(): Result<number, string> {
  return Math.random() > 0.5 ? Err("Failed!") : Ok(30000)
}

const result = risky()

if (result.isOk) {
  handleWinnings(result.ok)
} else {
  printLoss(result.err)
}
```

### Returning a result and ignoring the error

```ts
function risky(): Result<number, string> {
  if (errorCondition) return Err("I don't matter much.")
  return { foo: 88888 }
}

const valueWithDefault = risky().ok?.foo ?? 11111
```

### Wrapping a function that can throw

```ts
import { ExtError, unsafeFn } from "external-library"

const wrappedFn = intoResult<ExtError>(false)(unsafeFn)

const result = wrappedFn(123)

if (result.isOk) {
  handleResult(result.ok)
} else {
  handleError(result.err)
}
```

### Wrapping an async function that can throw

```ts
import { ExtError, unsafeAsyncFn } from "external-library"

const wrappedFn = intoResult<ExtError>(true)(unsafeAsyncFn)

const result = await wrappedFn(123)

if (result.isOk) {
  handleResult(result.ok)
} else {
  handleError(result.err)
}
```

### Wrapping function that relies on a `this` context and can throw

```ts
import { ExtError, ExtClass } from "external-library"

const extClassInstance = new ExtClass()

const wrappedAndBoundFn = intoResult<ExtError>(
  false,
  extClassInstance,
)(extClassInstance.unsafeFn)

const result = wrappedAndBoundFn(123)

if (result.isOk) {
  handleResult(result.ok)
} else {
  handleError(result.err)
}
```
