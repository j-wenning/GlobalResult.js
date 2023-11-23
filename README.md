# GlobalResult.js

_A simple utility for injecting a Result type into the global namespace_

## API

### `Ok` (Global)

Wraps a value in an `Ok` class.

### `Err` (Global)

Wraps a value in an `Err` class.

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
