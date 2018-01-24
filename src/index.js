export const defaultSettings = {
  namespace: '',
  elementDelimiter: '__',
  modifierDelimiter: '--',
  modifierValueDelimiter: '-',
}

const coalesce = (...args) => args.find(arg => arg !== void 0)

export class Block {
  constructor(block, element = null, modifier = {}, mixed = [], settings = {}) {
    this.block = block
    this.element = element
    this.modifier = modifier
    this.mixed = mixed
    this.settings = { ...defaultSettings, ...settings }
    // We probably want to use a getter but compat and all
    this.s = this.generate()
  }

  e(element) {
    if (this.element) {
      throw new Error(`${this} has already an element. Can set ${element}`)
    }
    return this.copy({
      element,
    })
  }

  m(modifier) {
    return this.copy({
      modifier: {
        ...this.modifier,
        ...(modifier || {}),
      },
      mixed: this.mixed.map(b => b.m(modifier)),
    })
  }

  mix(...blocks) {
    return this.copy({
      mixed: [
        ...this.mixed,
        ...blocks
          .map(
            blockOrString =>
              typeof blockOrString === 'string'
                ? new Block(blockOrString)
                : blockOrString
          )
          .filter(i => i),
      ],
    })
  }

  copy({ block, element, modifier, mixed, settings }) {
    return new Block(
      coalesce(block, this.block),
      coalesce(element, this.element),
      { ...coalesce(modifier, this.modifier) },
      [...coalesce(mixed, this.mixed)],
      { ...coalesce(settings, this.settings) }
    )
  }

  generate() {
    const bem = `${this.settings.namespace}${this.block}${
      this.element ? `${this.settings.elementDelimiter}${this.element}` : ''
    }`
    return [bem]
      .concat(
        Object.entries(this.modifier).map(([key, val]) => {
          if (val === true) {
            return `${bem}${this.settings.modifierDelimiter}${key}`
          } else if (val || val === 0) {
            return `${bem}${this.settings.modifierDelimiter}${key}${
              this.settings.modifierValueDelimiter
            }${val}`
          }
        })
      )
      .filter(i => i)
      .concat(this.mixed.map(mixed => mixed.s))
      .join(' ')
  }

  toString() {
    return this.s
  }
}

export const blockMaker = settings => block =>
  new Block(block, void 0, void 0, void 0, settings)

export default (...args) => new Block(...args)
