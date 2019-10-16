import { UPDATE_KEY } from './commonCount';

export function lifeDom<T>(target: HTMLElement, initState: T = {} as any) {
  const store = {
    _listenFns: new Set(),
    _listenNodes: new Set(),
    _state: initState,
    getState: () => store._state as T,
    update: (fn: (draft: T) => any) => {
      const data = fn(store._state);
      if (data) {
        store._state = data;
      }
      store._listenFns.forEach((v: any) => {
        const nextState = v(store._state);
        if (nextState) {
          store._state = nextState;
        }
      });
      store._listenNodes.forEach((node: any) => {
        if (node && node.__onMemo && node.__onUpdate) {
          const lastMemo = node.__onMemo(store._state);

          if (node.lastMemo !== lastMemo) {
            node.__onUpdate(lastMemo || []);
            node.lastMemo = lastMemo;
          }
        }
      });
    },
    listen: (fn: any) => {
      if (!store._listenFns.has(fn)) {
        store._listenFns.add(fn);
      }
    },
    disconnect: () => {},
  };

  function childListFn(mutation: any) {
    if (mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node: any) => {
        if (node.__onAppend) {
          node.__onAppend();
        }
        if (node.__onUpdate) {
          if (!store._listenNodes.has(node)) {
            store._listenNodes.add(node);
          }
        }
      });
    }
    if (mutation.removedNodes.length > 0) {
      mutation.removedNodes.forEach((node: any) => {
        store._listenNodes.delete(node);
        if (node.__onRemove) {
          node.__onRemove();
        }
      });
    }
  }

  function attributesFn(mutation: any) {
    if (mutation.target && mutation.target.__onUpdate) {
      const node = mutation.target;
      if (!store._listenNodes.has(node)) {
        store._listenNodes.add(node);
      }
    }
  }

  const mutationCallback = (mutationsList: any) => {
    for (let mutation of mutationsList) {
      let type = mutation.type;
      switch (type) {
        case 'childList':
          childListFn(mutation);
          break;
        case 'subtree':
          childListFn(mutation);
          break;
        case 'attributes':
          attributesFn(mutation);
          break;
        default:
          break;
      }
    }
  };

  const observer = new MutationObserver(mutationCallback);

  observer.observe(target as any, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [UPDATE_KEY],
  });

  store.disconnect = () => {
    // Later, you can stop observing
    observer.disconnect();
  };

  return store;
}
