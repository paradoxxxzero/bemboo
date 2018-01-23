export class Block {
  constructor(block, element = null, modifier = {}) {
    this.block = block
    this.element = element
    this.modifier = modifier
    // We probably want to use a getter but compat and all
    this.s = this.toString()
  }
  e(element) {
    if (this.element) {
      throw new Error(`${this} has already an element. Can set ${element}`)
    }
    return new Block(this.block, element, this.modifier)
  }
  m(modifier) {
    return new Block(this.block, this.element, {
      ...this.modifier,
      ...modifier,
    })
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
      .join(' ')
  }
}

export default block => new Block(block)
