import { ONUPDATE_KEY } from './commonCount';
import { createRoute } from './createRoute';
import { setDOM } from './dom-tools';

export function createStore<T>(initState: T = {} as any) {
  const store = {
    __listenFns: new Set<any>(),
    __listenNodes: new Set<any>(),
    __state: initState,
    mutationObserver: (target: any) => target,
    middleware: {
      update: [] as any[],
      getState: [] as any[],
    },
    getState: (): T => {
      if (store.middleware.getState.length > 0) {
        store.middleware.getState.forEach((getState: any) => {
          store.__state = getState(store.__state);
        });
      }
      return store.__state;
    },
    update: (fn: (draft: T) => any) => {
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
            node.__onUpdate(lastMemo || [], node);
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

  store.mutationObserver = (target: HTMLElement) => {
    if ((target as any).__isChain) {
      target = (target as any).target;
    }

    if (target.children) {
      const originChildren = [] as any;

      for (let i = 0; i < target.children.length; i++) {
        originChildren.push(target.children.item(i));
      }

      target.innerHTML = '';
      const waitParantNode = () => {
        setTimeout(() => {
          if (target.parentNode) {
            setDOM(target).append(...originChildren);
          } else {
            waitParantNode();
          }
        }, 17);
      };
      waitParantNode();
    }

    function childListFn(mutation: any) {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node: any) => {
          if (node.__onAppend) {
            node.__onAppend(node.__lastMemo, node);
          }
          if (node.__onUpdate) {
            if (!store.__listenNodes.has(node)) {
              store.__listenNodes.add(node);
            }
          }
        });
      }
      if (mutation.removedNodes.length > 0) {
        mutation.removedNodes.forEach((node: any) => {
          store.__listenNodes.delete(node);
          if (node.__onRemove) {
            node.__onRemove(node.__lastMemo, node);
          }
          if (node.__disconnect) {
            node.__disconnect();
          }
        });
      }
    }

    function attributesFn(mutation: any) {
      if (mutation.target && mutation.target.__onUpdate) {
        const node = mutation.target;
        if (!store.__listenNodes.has(node)) {
          store.__listenNodes.add(node);
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

    observer.observe(target, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [ONUPDATE_KEY],
    });

    (target as any).__disconnect = () => observer.disconnect();

    return target;
  };

  const { Route, routeManage } = createRoute(store);

  return { store, Route, routeManage };
}
