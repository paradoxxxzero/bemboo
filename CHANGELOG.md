# [2.0.0](https://github.com/Kozea/redux-api-unrest/compare/v1.4.1...v2.0.0)

- Make cache a global one accessible by importing `cache`.
- _BREAKING CHANGE_: cache is now longer in `settings`. Instead two new exported methods are available: `disableCache` which disables the cache and `resetCache` which empties and re-enable the cache.
- Fix a sneaky cache memory leak when using `.mix`.
- Upgrade dependencies.

### [1.4.1](https://github.com/Kozea/redux-api-unrest/compare/v1.4.0...v1.4.1)

- Add option to disable cache in setting

## [1.4.0](https://github.com/Kozea/redux-api-unrest/compare/v1.3.3...v1.4.0)

- Preserve equality to avoid unnecessary re-render

### [1.3.3](https://github.com/Kozea/redux-api-unrest/compare/v1.3.2...v1.3.3)

- Fix argument number for decorated class

### [1.3.2](https://github.com/Kozea/redux-api-unrest/compare/v1.3.1...v1.3.2)

- Upgrade dependencies

### [1.3.1](https://github.com/Kozea/redux-api-unrest/compare/v1.3.0...v1.3.1)

- Protect function name setting since it can crash on old browsers

## [1.3.0](https://github.com/Kozea/redux-api-unrest/compare/v1.2.0...v1.3.0)

- Use displayName when available

## [1.2.0](https://github.com/Kozea/redux-api-unrest/compare/v1.1.1...v1.2.0)

- Raise on empty block
- Remove class duplicates
- Add a `sub` method to remove specific classes

### [1.1.1](https://github.com/Kozea/redux-api-unrest/compare/v1.1.0...v1.1.1)

- Support anonymous function and support naming them on the fly.

## [1.1.0](https://github.com/Kozea/redux-api-unrest/compare/v1.0.1...v1.1.0)

- Support for class and function decorators.

### [1.0.1](https://github.com/Kozea/redux-api-unrest/compare/v1.0.0...v1.0.1)

- Filter out bad m/mix values.

# [1.0.0](https://github.com/Kozea/redux-api-unrest/compare/v0.0.2...v1.0.0)

- Settings support. (`namespace`, `elementDelimiter`, `modifierDelimiter`, `modifierValueDelimiter`).
- Refactor internals a bit.

### [0.0.2](https://github.com/Kozea/redux-api-unrest/compare/v0.0.1...v0.0.2)

- Add mix function to mix different block and support modifiers on all of them.

### [0.0.1](https://github.com/Kozea/redux-api-unrest/compare/...v0.0.1)

- First release.
