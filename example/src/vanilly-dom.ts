(function(arr) {
  arr.forEach(function(item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        (this as any).parentNode.removeChild(this);
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

(function(arr) {
  arr.forEach(function(item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append(...args: any[]) {
        args.forEach(v => {
          (this as HTMLElement).appendChild(v);
        });
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

export function append<T>(target: T, ...args: any[]) {
  (target as any).append(...args);
  return target;
}

export function setProps<T>(target: T, obj: any) {
  Object.keys(obj).forEach(k => {
    (target as any)[k] = obj[k];
  });
  return target;
}

export function setClass<T>(target: T, cssString: string) {
  (target as any).setAttribute('class', cssString);

  return target;
}

export const DOM = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: ElementCreationOptions,
): HTMLElementTagNameMap[K] => {
  return document.createElement(tagName, options);
};

export interface IdomObserverOption {
  childList?: any;
  attributes?: any;
  subtree?: any;
  attributeFilter?: string[];
}

export function lifeDom<T>(target: HTMLElement, initState: T = {} as any) {
  const store = {
    listens: new Set(),
    _state: initState,
    getState: () => store._state,
    update: (fn: (draft: T) => any) => {
      store._state = fn(store._state);
      store.listens.forEach((node: any) => {
        if (node.onMemo && node.onUpdate) {
          const lastMemo = node.onMemo(store._state);

          if (node.lastMemo !== lastMemo) {
            node.onUpdate(node.lastMemo);
            node.lastMemo = lastMemo;
          }
        }
      });
    },
  };

  domObserver(target, {
    childList: (obs: any) => {
      if (obs.addedNodes.length > 0) {
        obs.addedNodes.forEach((node: any) => {
          if (node.onAppend) {
            node.onAppend();
          }
          if (node.onUpdate) {
            if (!store.listens.has(node)) {
              store.listens.add(node);
            }
          }
        });
        obs.removedNodes.forEach((node: any) => {
          store.listens.delete(node);
          if (node.onRemove) {
            node.onRemove();
          }
        });
      }
    },
  });
}

export function domObserver(target: HTMLElement, opt: IdomObserverOption) {
  const config = {
    ...opt,
    attributes: !!opt.attributes,
    attributeOldValue: !!opt.attributes,
    childList: !!opt.childList,
    subtree: !!opt.subtree,
    characterData: false,
  };

  let observer: any;

  // Callback function to execute when mutations are observed
  const mutationCallback = (mutationsList: any) => {
    console.log('xxxx', mutationsList);
    for (let mutation of mutationsList) {
      let type = mutation.type;
      switch (type) {
        case 'childList':
          console.log('A child node has been added or removed.');
          opt.childList && opt.childList(mutation);
          break;
        case 'attributes':
          console.log(`The ${mutation.attributeName} attribute was modified.`);
          opt.attributes && opt.attributes(mutation);
          break;
        case 'subtree':
          console.log(`The subtree was modified.`);
          opt.subtree && opt.subtree(mutation);
          break;
        default:
          break;
      }
    }
  };

  // Create an observer instance linked to the callback function
  observer = new MutationObserver(mutationCallback);

  // Start observing the target node for configured mutations
  observer.observe(target, config);

  return () => {
    // Later, you can stop observing
    observer.disconnect();
  };
}
