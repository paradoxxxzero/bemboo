import shallowEqual from 'shallowequal'

export const defaultSettings = {
  namespace: '',
  elementDelimiter: '__',
  modifierDelimiter: '--',
  modifierValueDelimiter: '-',
}

const coalesce = (...args) => args.find(arg => arg !== void 0)

export class Block {
  constructor(
    block,
    element = null,
    modifier = {},
    mixed = [],
    subs = [],
    settings = {},
    cache = []
  ) {
    if (!block) {
      throw new Error('A block must be named')
    }
    this.block = block
    this.element = element
    this.modifier = modifier
    this.mixed = mixed
    this.subs = subs
    this.settings = { ...defaultSettings, ...settings }
    this.cache = cache
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
  sub(...subs) {
    return this.copy({
      subs: subs.join(' ').split(' '),
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

  copy({ block, element, modifier, mixed, subs, settings }) {
    const instance = new Block(
      coalesce(block, this.block),
      coalesce(element, this.element),
      { ...coalesce(modifier, this.modifier) },
      [...coalesce(mixed, this.mixed)],
      [...coalesce(subs, this.subs)],
      { ...coalesce(settings, this.settings) },
      this.cache
    )
    const incache = this.cache.find(
      item =>
        instance.block === item.block &&
        instance.element === item.element &&
        shallowEqual(instance.modifier, item.modifier) &&
        shallowEqual(instance.mixed, item.mixed) &&
        shallowEqual(instance.subs, item.subs) &&
        shallowEqual(instance.settings, item.settings)
    )

    if (incache) {
      return incache
    }
    this.cache.push(instance)
    return instance
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
      .split(' ')
      .reduce((x, y) => (x.includes(y) ? x : [...x, y]), [])
      .filter(x => !this.subs.includes(x))
      .join(' ')
  }

  toString() {
    return this.s
  }
}

export const wrapFunction = (fun, name, args) => {
  const wrapped = function(...fargs) {
    // eslint-disable-next-line no-invalid-this
    return fun.apply(this, [new Block(name, ...args), ...fargs])
  }
  // Try to set name on function (might crash on all browsers)
  try {
    Object.defineProperty(wrapped, 'name', { value: name })
  } catch (e) {
    // pass
  }
  return wrapped
}

export const wrapClass = (fun, name, args) => {
  const b = new Block(name, ...args)
  fun.prototype.b = b
  const { render } = fun.prototype
  fun.prototype.render = function(...cargs) {
    return render.apply(this, [b, ...cargs])
  }
  return fun
}

const block = (...args) => {
  let fun = null,
    name = null,
    extra = []
  if (
    args.length > 1 &&
    typeof args[0] == 'string' &&
    typeof args[1] == 'function'
  ) {
    ;[name, fun, ...extra] = args
  } else if (args.length && typeof args[0] == 'function') {
    ;[fun, ...extra] = args
    name = fun.displayName || fun.name || 'anonymous'
  }
  if (fun) {
    if (fun.prototype && fun.prototype.hasOwnProperty('render')) {
      return wrapClass(fun, name, extra)
    }
    return wrapFunction(fun, name, extra)
  }
  return new Block(...args)
}

export const blockMaker = settings => (...args) => {
  args[5] = { ...(args[5] || {}), ...settings }
  return block(...args)
}

export default block
