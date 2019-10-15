# vanilly

A VanillaJS Framework, No component, only add lifecycle to HTMLElement.

![](barmImage.jpg)

**No React, No Vue, Easy SPA**

Tiny, Clear and Light size:

No Gzip: 5k
Gzip: 2k

Feature:

- State manage
- Route
- Declarative build UI!
- immutable data update

## Install

Use unpkg, vanilly need immer:

```html
<script src="https://unpkg.com/immer@4.0.1/dist/immer.umd.js"></script>
<script src="https://unpkg.com/vanilly@0.1.0/umd/index.js"></script>
```

Or use npm:

```sh
npm i --save vanilly
# or
yarn add vanilly
```

```ts
import {DOM. navHistory, store} from 'vanilly'

// init state
store._state = {
  history: {
    '/app': {
      title: 'hello';
    },
  },
  paths: [],
} as IState;

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
