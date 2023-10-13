import { init, intoResult } from "./index.js"

init()

const OK = 123

const ERR = 456

class Foo {
  okReturn = OK
  errReturn = ERR

  async doBoundOk() {
    return this.okReturn
  }

  async doBoundErr() {
    throw this.errReturn
  }
}

function doUnboundOk() {
  return OK
}

function doUnboundErr() {
  throw ERR
}

const foo = new Foo()

const boundOk = await intoResult<number>(true, foo)(foo.doBoundOk)()
if (!(boundOk.isOk && boundOk.ok === OK))
  throw Error(`Error for Bound Ok: ${JSON.stringify(boundOk)}`)

const boundErr = await intoResult<number>(true, foo)(foo.doBoundErr)()
if (!(!boundErr.isOk && boundErr.err === ERR))
  throw Error(`Error for Bound Err: ${JSON.stringify(boundErr)}`)

const unboundOk = intoResult<number>(false)(doUnboundOk)()
if (!(unboundOk.isOk && unboundOk.ok === OK))
  throw Error(`Error for Unbound Ok: ${JSON.stringify(unboundOk)}`)

const unboundErr = intoResult<number>(false)(doUnboundErr)()
if (!(!unboundErr.isOk && unboundErr.err === ERR))
  throw Error(`Error for Unbound Err: ${JSON.stringify(unboundErr)}`)

console.log("All tests passed!")
