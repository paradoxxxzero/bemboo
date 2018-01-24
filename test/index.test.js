import block, { Block, blockMaker } from '../src'

describe('Block test', () => {
  it('generates block class name in all the different usage', () => {
    expect(block('block').toString()).toEqual('block')
    expect(block('block').s).toEqual('block')
    expect(new Block('block').toString()).toEqual('block')
    expect(new Block('block')).toEqual(block('block'))
  })
  it('generates block element', () => {
    expect(block('block').e('element').s).toEqual('block__element')
    expect(new Block('block').e('').toString()).toEqual('block')
  })
  it('raises on redefining block element', () => {
    expect(
      () =>
        block('block')
          .e('element')
          .e('element2').s
    ).toThrow('block__element has already an element. Can set element2')
  })
  it('generates block modifiers', () => {
    expect(
      block('block').m({
        modifier: true,
        modifier2: true,
        modifier3: 0,
        nonmodifier: false,
        nonmodifier2: null,
        nonmodifier3: void 0,
        nonmodifier4: '',
      }).s
    ).toEqual('block block--modifier block--modifier2 block--modifier3-0')
    expect(
      block('block').m({
        modifier: true,
        type: 'big',
        index: 12,
      }).s
    ).toEqual('block block--modifier block--type-big block--index-12')
  })
  it('generates block element modifiers', () => {
    expect(
      block('block')
        .e('element')
        .m({
          modifier: true,
          modifier2: true,
          modifier3: 0,
          nonmodifier: false,
          nonmodifier2: null,
          nonmodifier3: void 0,
          nonmodifier4: '',
        }).s
    ).toEqual(
      'block__element block__element--modifier ' +
        'block__element--modifier2 block__element--modifier3-0'
    )
    expect(
      block('block')
        .e('element')
        .m({
          modifier: true,
          type: 'big',
          index: 12,
        }).s
    ).toEqual(
      'block__element block__element--modifier ' +
        'block__element--type-big block__element--index-12'
    )
  })
  it('also works with reusing same instance', () => {
    const b = block('block')
    expect(b.s).toEqual('block')
    expect(b.m({ modifier: true }).s).toEqual('block block--modifier')
    expect(b.m({ modifier2: true }).s).toEqual('block block--modifier2')
    const e = b.e('element')
    expect(e.m({ modifier: true }).s).toEqual(
      'block__element block__element--modifier'
    )
    expect(e.m({ modifier2: true }).s).toEqual(
      'block__element block__element--modifier2'
    )
  })
  it('can chain modifiers', () => {
    expect(
      block('block')
        .e('element')
        .m({
          modifier: true,
        })
        .m({
          type: 'small',
        }).s
    ).toEqual(
      'block__element block__element--modifier block__element--type-small'
    )
  })
  it('can mix blocks', () => {
    expect(block('block').mix(block('mix')).s).toEqual('block mix')
    expect(block('block').mix(block('mix').mix(block('max'))).s).toEqual(
      'block mix max'
    )
    expect(
      block('block')
        .mix(block('mix').mix(block('min')))
        .mix(block('max')).s
    ).toEqual('block mix min max')
    expect(
      block('block')
        .e('element')
        .mix(block('mix')).s
    ).toEqual('block__element mix')
    expect(block('block').mix(block('mix').e('mixed')).s).toEqual(
      'block mix__mixed'
    )
  })
  it('can mix blocks and apply modifier to all', () => {
    expect(
      block('block')
        .mix(block('mix'))
        .m({ modifier: true }).s
    ).toEqual('block block--modifier mix mix--modifier')
    expect(block('block').mix(block('mix').m({ modifier: true })).s).toEqual(
      'block mix mix--modifier'
    )
    expect(
      block('block')
        .mix(block('mix').mix(block('min')))
        .mix(block('max'))
        .m({ modifier: true }).s
    ).toEqual(
      'block block--modifier mix mix--modifier ' +
        'min min--modifier max max--modifier'
    )
    expect(
      block('block')
        .mix(block('mix'), block('min'))
        .mix(block('max'))
        .m({ modifier: true }).s
    ).toEqual(
      'block block--modifier mix mix--modifier ' +
        'min min--modifier max max--modifier'
    )
  })
  it('can mix with strings', () => {
    expect(
      block('block')
        .mix('mix')
        .m({ modifier: true }).s
    ).toEqual('block block--modifier mix mix--modifier')
    expect(
      block('block')
        .mix(block('mix'), 'min')
        .mix(block('max'))
        .m({ modifier: true }).s
    ).toEqual(
      'block block--modifier mix mix--modifier ' +
        'min min--modifier max max--modifier'
    )
  })
  it('respects settings', () => {
    expect(
      block('block', void 0, void 0, void 0, { elementDelimiter: '@' }).m({
        modifier: true,
        mod: 'ifier',
      }).s
    ).toEqual('block block--modifier block--mod-ifier')
    expect(
      block('block', void 0, void 0, void 0, { elementDelimiter: '@' })
        .e('element')
        .m({ modifier: true, mod: 'ifier' }).s
    ).toEqual('block@element block@element--modifier block@element--mod-ifier')
    expect(
      block('block', void 0, void 0, void 0, { modifierDelimiter: '#' })
        .e('element')
        .m({ modifier: true, mod: 'ifier' }).s
    ).toEqual('block__element block__element#modifier block__element#mod-ifier')
    expect(
      block('block', void 0, void 0, void 0, { modifierValueDelimiter: '/' })
        .e('element')
        .m({ modifier: true, mod: 'ifier' }).s
    ).toEqual(
      'block__element block__element--modifier block__element--mod/ifier'
    )
    expect(
      block('block', void 0, void 0, void 0, {
        elementDelimiter: '@',
        modifierDelimiter: '#',
      })
        .e('element')
        .m({ modifier: true, mod: 'ifier' }).s
    ).toEqual('block@element block@element#modifier block@element#mod-ifier')
    expect(
      block('block', void 0, void 0, void 0, {
        elementDelimiter: '@',
        modifierValueDelimiter: '/',
      })
        .e('element')
        .m({ modifier: true, mod: 'ifier' }).s
    ).toEqual('block@element block@element--modifier block@element--mod/ifier')
    expect(
      block('block', void 0, void 0, void 0, {
        elementDelimiter: '@',
        modifierDelimiter: '#',
        modifierValueDelimiter: '/',
      })
        .e('element')
        .m({ modifier: true, mod: 'ifier' }).s
    ).toEqual('block@element block@element#modifier block@element#mod/ifier')
  })
  it('respects settings defined with blockMaker', () => {
    const block2 = blockMaker({
      elementDelimiter: '@',
      modifierDelimiter: '#',
      modifierValueDelimiter: '/',
    })
    expect(
      block2('block')
        .e('element')
        .m({ modifier: true, mod: 'ifier' }).s
    ).toEqual('block@element block@element#modifier block@element#mod/ifier')
    expect(
      block2('block2')
        .e('element2')
        .m({ modifier2: true, mod: 'ifier2' }).s
    ).toEqual(
      'block2@element2 block2@element2#modifier2 block2@element2#mod/ifier2'
    )
  })
  it('respects namespace', () => {
    const block2 = blockMaker({
      namespace: 'bemboo->',
    })
    expect(
      block2('block')
        .e('element')
        .m({ modifier: true, mod: 'ifier' }).s
    ).toEqual(
      'bemboo->block__element bemboo->block__element--modifier ' +
        'bemboo->block__element--mod-ifier'
    )
    expect(
      block2('block2')
        .e('element2')
        .m({ modifier2: true, mod: 'ifier2' }).s
    ).toEqual(
      'bemboo->block2__element2 bemboo->block2__element2--modifier2 ' +
        'bemboo->block2__element2--mod-ifier2'
    )
  })
})
