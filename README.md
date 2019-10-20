# vanilly

A VanillaJS Framework, No component, only add lifecycle to HTMLElement.

![](barmImage.jpg)

**No React, No Vue, Easy SPA**

Tiny, Clear and Light size:

| Compress type | Size |
| ------------- | ---- |
| No Gzip       | 11k  |
| Gzip          | 4k   |

Feature:

- State manage
- Route (Don't Support IE9)
- Chain declarative UI

## Install

Use unpkg:

```html
<script src="https://unpkg.com/vanilly@x.x.x/umd/index.js"></script>
```

> Change `vanilly@x.x.x` to package.json version, like: `vanilly@0.1.2`

Or use npm:

```sh
npm i --save vanilly
# or
yarn add vanilly
```

## Create DOMs example

Read example/src/index.ts

## Dependent polyfill: Set

```js
// install core-js
import 'core-js/features/set';
```
