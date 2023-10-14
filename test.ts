#!/usr/bin/env -S deno run

import { init, intoResult } from "./index.js"

init()

const OK = 123

const ERR = 456

class Foo {
  okReturn = OK
  errReturn = ERR

  async doAsyncBoundOk() {
    return this.okReturn
  }

  doBoundOk() {
    return this.okReturn
  }

  async doAsyncBoundErr() {
    throw this.errReturn
  }

  doBoundErr() {
    throw this.errReturn
  }
}

async function doAsyncUnboundOk() {
  return OK
}

function doUnboundOk() {
  return OK
}

async function doAsyncUnboundErr() {
  throw ERR
}

function doUnboundErr() {
  throw ERR
}

const foo = new Foo()

// // Async checks

// Bound
const asyncBoundOk = await intoResult<number>(foo, true)(foo.doAsyncBoundOk)()
if (!(asyncBoundOk.isOk && asyncBoundOk.ok === OK))
  throw Error(`Error for Async Bound Ok: ${JSON.stringify(asyncBoundOk)}`)

const asyncBoundErr = await intoResult<number>(foo, true)(foo.doAsyncBoundErr)()
if (!(!asyncBoundErr.isOk && asyncBoundErr.err === ERR))
  throw Error(`Error for Async Bound Err: ${JSON.stringify(asyncBoundErr)}`)

// Unbound
const asyncUnboundOk = await intoResult<number>(true)(doAsyncUnboundOk)()
if (!(asyncUnboundOk.isOk && asyncUnboundOk.ok === OK))
  throw Error(`Error for Unbound Ok: ${JSON.stringify(asyncUnboundOk)}`)

const asyncUnboundErr = await intoResult<number>(true)(doAsyncUnboundErr)()
if (!(!asyncUnboundErr.isOk && asyncUnboundErr.err === ERR))
  throw Error(`Error for Unbound Err: ${JSON.stringify(asyncUnboundErr)}`)

// // Sync checks

// Bound
const implicitBoundOk = intoResult<number>(foo)(foo.doBoundOk)()
if (!(implicitBoundOk.isOk && implicitBoundOk.ok === OK))
  throw Error(`Error for Bound Ok: ${JSON.stringify(implicitBoundOk)}`)

const implicitBoundErr = intoResult<number>(foo)(foo.doBoundErr)()
if (!(!implicitBoundErr.isOk && implicitBoundErr.err === ERR))
  throw Error(`Error for Bound Err: ${JSON.stringify(implicitBoundErr)}`)

const explicitBoundOk = intoResult<number>(foo, false)(foo.doBoundOk)()
if (!(explicitBoundOk.isOk && explicitBoundOk.ok === OK))
  throw Error(`Error for Bound Ok: ${JSON.stringify(explicitBoundOk)}`)

const explicitBoundErr = intoResult<number>(foo, false)(foo.doBoundErr)()
if (!(!explicitBoundErr.isOk && explicitBoundErr.err === ERR))
  throw Error(`Error for Bound Err: ${JSON.stringify(explicitBoundErr)}`)

// Unbound
const implicitUnboundOk = intoResult<number>()(doUnboundOk)()
if (!(implicitUnboundOk.isOk && implicitUnboundOk.ok === OK))
  throw Error(`Error for Unbound Ok: ${JSON.stringify(implicitUnboundOk)}`)

const implicitUnboundErr = intoResult<number>()(doUnboundErr)()
if (!(!implicitUnboundErr.isOk && implicitUnboundErr.err === ERR))
  throw Error(`Error for Unbound Err: ${JSON.stringify(implicitUnboundErr)}`)

const explicitUnboundOk = intoResult<number>(false)(doUnboundOk)()
if (!(explicitUnboundOk.isOk && explicitUnboundOk.ok === OK))
  throw Error(`Error for Unbound Ok: ${JSON.stringify(explicitUnboundOk)}`)

const explicitUnboundErr = intoResult<number>(false)(doUnboundErr)()
if (!(!explicitUnboundErr.isOk && explicitUnboundErr.err === ERR))
  throw Error(`Error for Unbound Err: ${JSON.stringify(explicitUnboundErr)}`)

// // Misc. Checks
const emptyOk = Ok()
if (emptyOk.ok !== null)
  throw Error(`Error for Empty Ok: ${JSON.stringify(emptyOk)}`)

console.log("All tests passed!")
