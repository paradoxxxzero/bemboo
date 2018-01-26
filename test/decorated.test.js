import block from '../src'

describe('Block decoration test', () => {
  it('decorates function', () => {
    const decoratedFun = block(function fun(b, { args }) {
      return { b, args }
    })
    expect(decoratedFun.name).toEqual('fun')
    expect(decoratedFun({ args: 1 })).toEqual({ b: block('fun'), args: 1 })
  })
  it('decorates class', () => {
    @block
    class DecoratedClass {
      render(b) {
        return b
      }
    }
    const decoratedInst = new DecoratedClass()
    expect(decoratedInst.constructor.name).toEqual('DecoratedClass')
    expect(decoratedInst.render()).toEqual(block('DecoratedClass'))
    expect(decoratedInst.b).toEqual(block('DecoratedClass'))
    expect(DecoratedClass.prototype.b).toEqual(block('DecoratedClass'))
  })
  it('doesn’t break the this', () => {
    @block
    class DecoratedClass {
      ensureContext() {
        return 'okay'
      }
      render(b) {
        if (this.ensureContext() === 'okay') {
          return b
        }
        throw new Error('Wrong this')
      }
    }
    const decoratedInst = new DecoratedClass()
    expect(decoratedInst.constructor.name).toEqual('DecoratedClass')
    expect(decoratedInst.render()).toEqual(block('DecoratedClass'))
    expect(decoratedInst.b).toEqual(block('DecoratedClass'))
    expect(DecoratedClass.prototype.b).toEqual(block('DecoratedClass'))
  })
  it('decorates anonymous function', () => {
    const decoratedFun = block('fun', (b, { args }) => ({ b, args }))
    expect(decoratedFun.name).toEqual('fun')
    expect(decoratedFun({ args: 1 })).toEqual({ b: block('fun'), args: 1 })
  })
})
