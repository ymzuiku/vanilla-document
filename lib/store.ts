import produce from 'immer';

export const store = {
  listens: new Set<ICache>(),
  addListen: (item: ICache) => {
    if (!store.listens.has(item)) {
      store.listens.add(item);
    }

    return () => {
      store.listens.delete(item);
    };
  },
  _state: {
    history: {},
  } as any,
  getState: <T>(): T => store._state,
  update: <T>(fn: (stateImmerDraft: T) => any) => {
    // tslint:disable-next-line
    store._state = produce(store._state, (draft: any) => {
      fn(draft);
    });

    // 触发更新
    store.listens.forEach((item: ICache) => {
      if (item.isStopUpdate) {
        return;
      }
      if (item.onMemo) {
        const memoValue = item.onMemo(store._state);
        let shouldUpdate = false;
        for (let i = 0; i < item.lastMemo.length; i++) {
          // immutable
          if (item.lastMemo[i] !== memoValue[i]) {
            shouldUpdate = true;
            break;
          }
        }
        if (shouldUpdate) {
          item.lastMemo = memoValue;
          if (item.onUpdate) {
            item.onUpdate(item.lastMemo);
          }
        }
      } else {
        item.onUpdate(item.lastMemo);
      }
    });
  },
};
