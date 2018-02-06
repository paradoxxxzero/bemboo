# bemboo

## b('block').e('element').m({ modifier: true })

[![Build Status](https://travis-ci.org/paradoxxxzero/bemboo.svg?branch=master)](https://travis-ci.org/paradoxxxzero/bemboo)
[![Coverage Status](https://coveralls.io/repos/github/paradoxxxzero/bemboo/badge.svg?branch=master)](https://coveralls.io/github/paradoxxxzero/bemboo?branch=master)

A bem generator based on objects for React 16 use.

## React Usage

```es6
import block from 'bemboo'
import React from 'react'

const b = block('Component')
export default active => (
  <section className={b}>
    <article className={b.e('element').m({ active })}>hello</article>
  </section>
)
```

will generates if active is true:

```html
<section class="Component">
  <article class="Component__element Component__element--active">
    hello
  </article>
</section>
```

## Api

Default export is function `block` that return a new `Block` instance.

A `blockMaker` function is also exported, this function takes a settings mapping and return a block function using these settings.

The `Block` class (which is also exported) exposes the following functions / attributes:

### constructor(block, element = null, modifier = {}, mixed = [], settings = {})

Initialize the Block object. Only block argument is meant to be used externally.

### e(element)

Add element to a new instance of this `Block` and returns it. Can only be set once per `Block` instance.
`element` argument is a string.

### m(modifier)

Add modifier to a new instance of this `Block` and returns it. Can be used more than once, modifier are merged.
`modifier` is a mapping of modifier -> values. If the value is false the modifier will be ignored, if the value is true it will generate a `--modifier` and if the value is truthy or 0 a `--modifier-value`. This modifier will be applied to all already mixed blocks.

### mix(...blocks)

This fuction can mix other blocks with this `Block` instance and return a new instance with both blocks.
`blocks` arguments can be `Block` instances or strings.

### s

The generated string (which is also returned by `toString()`)

## Features

```es6
// Usage
> const b = block('block')
> b.toString()
'block'
> b.s
'block'

// For the following evaluations an implicit toString() is implied:

> b.e('element')
'block__element'

> b.e('element').m({ modifier: true })
'block__element block__element--modifier'

> b.e('element').m({ modifier: true }).m({ hidden: false, no: 8 })
'block__element block__element--modifier block__element--no-8'

> b.e('element').mix('main')
'block__element main'

> b.e('element').mix(block('main'))
'block__element main'

> b.e('element').m({ modifier: true }).mix('main')
'block__element block__element--modifier main'

> b.e('element').mix('main').m({ modifier: true })
'block__element block__element--modifier main main--modifier'

> b.mix('main', 'header').mix('principal')
'block main header principal'

> b.mix('main', 'header').m({ modifier: true})
'block block--modifier main main--modifier header header--modifier'

> b.mix('main', 'header').m({ modifier: true}).sub('header', 'main--modifier')
'block block--modifier main header--modifier'

// blockMaker allow you to change the default settings:
const block12 = blockMaker({
  namespace: 'bemboo->',
  elementDelimiter: '@',
  modifierDelimiter: '#',
  modifierValueDelimiter: '/',
})

> block2('block2').e('element2').m({ modifier2: true, mod: 'ifier2' })
'bemboo->block2@element2 bemboo->block2@element2#modifier2 bemboo->block2@element2#mod/ifier2'
```

## Decorator

### Functions

```es6
import block from 'bemboo'
import React from 'react'

export default block(function Component(b, { active }) {
  return (
    <section className={b}>
      <article className={b.e('element').m({ active })}>hello</article>
    </section>
  )
})
```

### Classes

```es6
import block from 'bemboo'
import React from 'react'

@block
export default class Component extends React.Component {
  render(b) {
    return (
      <section className={b}>
        <article className={b.e('element').m({ active })}>hello</article>
      </section>
    )
  }
})
```

## Mangling

These decorators use the `Component.displayName` or the `Component` `name` if it isn't set. If you are using a minifier that mangles the function/class names your bem class won't work (and probably be replaced with something like 't\_\_element'). Either disable mangling or use a babel plugin like [babel-plugin-add-react-static-displayname](https://github.com/paradoxxxzero/babel-plugin-add-react-static-displayname)
