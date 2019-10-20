# vanilly

A VanillaJS Framework, No component, only add lifecycle to HTMLElement.

![](barmImage.jpg)

**No React, No Vue, Easy SPA**

Tiny, Clear and Light size:

| Compress type | Size |
| ------------- | ---- |
| No Gzip       | 9k   |
| Gzip          | 3.5k |

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

Long JSX, we can split codes:

```ts
import { DOM } from 'vanilly';

const App = () => {
  const root = DOM('div')
    .cssText('background:#f88')
    .textContent('user-page')
    .onUpdate(
      (s: any) => [s.age],
      ([age]: [number], self: any) => {
        if (age > 10) {
          toDOM(self).removeChild(ele => {
            if (ele.id === 'input') {
              toDOM(ele).remove();
            }
          });
        }
      },
    );

  const input = DOM('input')
    .props({ id: 'input' })
    .onRemove(() => {
      console.log('input-remove');
    });

  const p = DOM('p')
    .onUpdate<IState, [number]>(
      s => [s.age],
      ([age], self) => {
        console.log(age);
        self.textContent = age as any;
        console.log('xx');
      },
    )
    .onAppend(() => {
      console.log('onAppend-sub-p');
    })
    .textContent('111');

  const button = DOM('button')
    .ref(e => {
      e.onclick = () => {
        console.log('haha');
      };
    })
    .textContent('user-page-click');

  const changePage = DOM('button')
    .addEventListener('click', () => {
      routeManage.push('/home');
    })
    .textContent('go-home-page');

  return root.append(input, p, button, changePage);
};

document.body.append(App());
```

## Dependent polyfill: Set

```js
// install core-js
import 'core-js/features/set';
```
