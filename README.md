# vanilly

A VanillaJS Framework, No component, only add lifecycle to HTMLElement.

![](barmImage.jpg)

**No React, No Vue, Easy SPA**

Tiny, Clear and Light size:

| Compress type | Size |
| ------------- | ---- |
| No Gzip       | 8k   |
| Gzip          | 3k   |

Feature:

- State manage
- Route
- Declarative build and Update UI!
- immutable data update (Use Immer)

## Install

Use unpkg, vanilly need immer:

```html
<script src="https://unpkg.com/immer@4.0.1/dist/immer.umd.js"></script>
<script src="https://unpkg.com/vanilly@x.x.x/umd/index.js"></script>
```

Or use npm:

```sh
npm i --save vanilly
# or
yarn add vanilly
```

## Create DOMs example

```ts
// if use typescript, can use reference:
/// <reference types="vanilly" />

import { DOM, navHistory } from 'vanilly';

const App = () => {
  const refs = {
    message: DOM('span'),
  };

  const root = DOM('div')
    .set({
      onclick: () => {},
    })
    .setStyle({
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
    })
    .setChilds(
      DOM('h2').set({ textContent: 'VBind lable and input:' }),
      DOM('span').setRef(r => (refs.message = r)),
      DOM('input').set({
        oninput: (e: any) => {
          refs.message.textContent = e.target.value;
        },
      }),
      DOM('button')
        .set({ textContent: 'go home' })
        .set({
          onclick: () => {
            navHistory.push('/home');
          },
        }),
    );

  root.onAppend = () => {
    console.log('listening, at element append to parentElement');
  };

  root.onRemove = () => {
    console.log(
      'listening at element at remove by dom, when use root.remove, or parentElement use remove or removeChild',
    );
  };

  root.onUpdate = () => {
    console.log('listening, when store.update(...)');
  };

  return root;
};

document.body.append(App());
```

## Use state example

```ts
import {DOM. navHistory, store} from 'vanilly'

// init state
const state = {
  history: {
    '/app': {
      title: 'hello';
    },
  },
  paths: [],
};

store._state = {...store._state, ...state};

type IState = typeof state;

// like Component, but only return HTMLElement
const App = (path:string)=>{
  // create barm element
  // app is HTMLDIVElement object
  const app = DOM('div'); // document.createElement('div')

  // We don't need app.onInit

// Only at s.title change, run ele.onUpdate
  app.onMemo = (s:IState) => [s.paths, s.history['/app'].title];

  // Declarative UI props;
  app.onUpdate = (s: IState, memo: any[]) => {
    app.innerText = memo[1];
    console.log('onUpdate:', s);
  };

  app.onRemove = (s: IState, memo: any[]) => {
    console.log('onRemove:', s);
  };

  return app;
}

document.body.appendChild(Route('/app', App));

// init route at append element
navHistory.init('/app');

// you can change history
setTimeout(() => {
  // update all barm
  store.update((s: IState) => {
    s.history['/app'].title = 'hello world';
  });
}, 1000);

setTimeout(() => {
  // change URL
  navHistory.push('/empry-page');
}, 1000);

setTimeout(() => {
  // goback URL
  navHistory.pop();
}, 2000);

```
