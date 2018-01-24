export class Block {
  constructor(block, element = null, modifier = {}, mixed = []) {
    this.block = block
    this.element = element
    this.modifier = modifier
    this.mixed = mixed
    // We probably want to use a getter but compat and all
    this.s = this.toString()
  }

  e(element) {
    if (this.element) {
      throw new Error(`${this} has already an element. Can set ${element}`)
    }
    return new Block(this.block, element, { ...this.modifier }, [...this.mixed])
  }

  m(modifier) {
    return new Block(
      this.block,
      this.element,
      {
        ...this.modifier,
        ...modifier,
      },
      this.mixed.map(b => b.m(modifier))
    )
  }

  mix(...block) {
    return new Block(this.block, this.element, { ...this.modifier }, [
      ...this.mixed,
      ...block,
    ])
  }

  toString() {
    const bem = `${this.block}${this.element ? `__${this.element}` : ''}`
    return [bem]
      .concat(
        Object.entries(this.modifier).map(([key, val]) => {
          if (val === true) {
            return `${bem}--${key}`
          } else if (val || val === 0) {
            return `${bem}--${key}-${val}`
          }
        })
      )
      .filter(i => i)
      .concat(this.mixed.map(mixed => mixed.s))
      .join(' ')
  }
}

export default block => new Block(block)
