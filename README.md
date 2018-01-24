# bemboo
## b('block').e('element').m({ modifier: true })

[![Build Status](https://travis-ci.org/paradoxxxzero/bemboo.svg?branch=master)](https://travis-ci.org/paradoxxxzero/bemboo)
[![Coverage Status](https://coveralls.io/repos/github/paradoxxxzero/bemboo/badge.svg?branch=master)](https://coveralls.io/github/paradoxxxzero/bemboo?branch=master)

A bem generator based on objects for React 16 use.

## React Usage

```es6
import React from 'react'
import block from 'bemboo'

const b = block('Component')
export default (active) => (
  <section className={b}>
    <article className={b.e('element').m({active})}>
      hello
    </article>
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
