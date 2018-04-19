import block, { blockMaker } from '../src'

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
    const decoratedFun = block((b, { args }) => ({ b, args }))
    expect(decoratedFun.name).toEqual('anonymous')
    expect(decoratedFun({ args: 1 })).toEqual({
      b: block('anonymous'),
      args: 1,
    })
  })
  it('decorates and name anonymous function', () => {
    const decoratedFun = block('fun', (b, { args }) => ({ b, args }))
    expect(decoratedFun.name).toEqual('fun')
    expect(decoratedFun({ args: 1 })).toEqual({ b: block('fun'), args: 1 })
  })
  it('decorates with blockMaker made block', () => {
    const block2 = blockMaker({
      elementDelimiter: '@',
      modifierDelimiter: '#',
      modifierValueDelimiter: '/',
    })
    const decoratedFun = block2(function fun(b) {
      return b.e('oh').m({ yeah: true }).s
    })
    expect(decoratedFun.name).toEqual('fun')
    expect(decoratedFun()).toEqual('fun@oh fun@oh#yeah')
  })
  it('decorates class with blockMaker made block', () => {
    const block2 = blockMaker({
      elementDelimiter: '@',
      modifierDelimiter: '#',
      modifierValueDelimiter: '/',
    })
    @block2
    class DecoratedClass {
      render(b) {
        return b
      }
    }
    const decoratedInst = new DecoratedClass()
    expect(decoratedInst.constructor.name).toEqual('DecoratedClass')
    expect(decoratedInst.render()).toEqual(block2('DecoratedClass'))
    expect(decoratedInst.b).toEqual(block2('DecoratedClass'))
    expect(DecoratedClass.prototype.b).toEqual(block2('DecoratedClass'))
    expect(decoratedInst.b.e('a').m({ b: 2 }).s).toEqual(
      'DecoratedClass@a DecoratedClass@a#b/2'
    )
  })
})
