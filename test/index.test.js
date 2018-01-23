import block, { Block } from '../src'

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
        active: true,
        active2: true,
        active3: 0,
        passive: false,
        passive2: null,
        passive3: void 0,
        passive4: '',
      }).s
    ).toEqual('block block--active block--active2 block--active3-0')
    expect(
      block('block').m({
        active: true,
        type: 'big',
        index: 12,
      }).s
    ).toEqual('block block--active block--type-big block--index-12')
  })
  it('generates block element modifiers', () => {
    expect(
      block('block')
        .e('element')
        .m({
          active: true,
          active2: true,
          active3: 0,
          passive: false,
          passive2: null,
          passive3: void 0,
          passive4: '',
        }).s
    ).toEqual(
      'block__element block__element--active ' +
        'block__element--active2 block__element--active3-0'
    )
    expect(
      block('block')
        .e('element')
        .m({
          active: true,
          type: 'big',
          index: 12,
        }).s
    ).toEqual(
      'block__element block__element--active ' +
        'block__element--type-big block__element--index-12'
    )
  })
  it('can chain modifiers', () => {
    expect(
      block('block')
        .e('element')
        .m({
          active: true,
        })
        .m({
          type: 'small',
        }).s
    ).toEqual(
      'block__element block__element--active block__element--type-small'
    )
  })
})
