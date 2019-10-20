export function createStore<T>(state: T) {
  const store = {
    state,
    events: new Set<any>(),
    /** listen Fn in update, memo is Filter listen whith diff state  */
    listen: (fn: (state: T) => any, memo?: (state: T) => any[]) => {
      if (memo) {
        (fn as any).getMemo = memo;
        (fn as any).lastMemo = memo(store.state);
      }

      if (!store.events.has(fn)) {
        store.events.add(fn);
      }

      return () => {
        store.events.delete(fn);
      };
    },
    unListen: (fn: any) => {
      store.events.delete(fn);
    },
    setState: (payload: T) => {
      store.state = {
        ...store.state,
        ...payload,
      };

      store.update();
    },
    /** You can replace this Function, example add immer in this */
    beforeUpdate: (fn: any) => {
      if (fn) {
        fn(store.state);
      }
    },
    update: (fn?: (state: T) => any) => {
      store.beforeUpdate(fn);
      store.events.forEach(fn => {
        if (fn.getMemo && fn.lastMemo) {
          const nowMemo = fn.getMemo(store.state);
          let isNeedUpdate = false;
          for (let i = 0; i < fn.lastMemo.length; i++) {
            const v = fn.lastMemo[i];
            if (v !== nowMemo[i]) {
              isNeedUpdate = true;
              break;
            }
          }
          if (isNeedUpdate) {
            fn(store.state);
          }
        } else {
          fn(store.state);
        }
      });
    },
  };

  return store;
}
