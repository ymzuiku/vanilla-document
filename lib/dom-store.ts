import { createRoute } from './createRoute';

const store = {
  __listenFns: new Set<any>(),
  __listenNodes: new Set<any>(),
  __state: {} as any,
  mutationObserver: (target: any) => target,
  middleware: {
    update: [] as any[],
    getState: [] as any[],
  },
  getState: <T extends any>(): T => {
    if (store.middleware.getState.length > 0) {
      store.middleware.getState.forEach((getState: any) => {
        store.__state = getState(store.__state);
      });
    }
    return store.__state;
  },
  update: <T extends any>(fn: (draft: T) => any) => {
    if (store.middleware.update.length > 0) {
      store.middleware.update.forEach((update: any) => {
        store.__state = update(store.__state);
      });
    }
    const data = fn(store.__state);
    if (data) {
      store.__state = data;
    }
    store.__listenFns.forEach((v: any) => {
      const nextState = v(store.__state);
      if (nextState) {
        store.__state = nextState;
      }
    });
    store.__listenNodes.forEach((node: any) => {
      if (node && node.__onMemo && node.__onUpdate) {
        const lastMemo = node.__onMemo(store.__state);

        if (node.__lastMemo !== lastMemo) {
          node.__onUpdate(lastMemo || [], node._DOM);
          node.__lastMemo = lastMemo;
        }
      }
    });
  },
  listen: (fn: any) => {
    if (!store.__listenFns.has(fn)) {
      store.__listenFns.add(fn);
    }
  },
};

const { Route, routeManage } = createRoute(store);

export { store, Route, routeManage };
