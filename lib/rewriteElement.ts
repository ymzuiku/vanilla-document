import { store } from './store';

(window as any).__isRewrite = false;

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

function initElement(target: HTMLElement) {
  if (target && typeof target === 'object' && !target.$cache) {
    target.$cache = {} as any;
    target.$cache.childs = new Set();
  }
}

const rewriteElement = () => {
  if ((window as any).__isRewrite) {
    return;
  }
  (window as any).__isRewrite = true;

  // remove
  const remove = (HTMLElement as any).prototype.remove;
  (HTMLElement as any).prototype.remove = function(...args: any) {
    initElement(this);

    if (this.$cache.removing) {
      return;
    }
    this.$cache.removing = true;
    if (this.onUpdate) {
      // tslint:disable-next-line
      if (this.$cache.isListenUpdate) {
        store.listens.delete(this.$cache);
      }
    }

    if (this.onRemove) {
      this.onRemove(this.$cache.lastMemo, this);
      this.onRemove = undefined;
    }

    this.$cache.childs.forEach((node: any) => {
      node.remove();
    });

    this.$cache.childs = null;
    this.$cache = null;
    remove.call(this, ...args);
  };

  // removeChild
  (HTMLElement as any).prototype.removeChild = function(child: HTMLElement) {
    initElement(this);

    child.remove();
  };

  // appendChild
  const appendChild = (HTMLElement as any).prototype.appendChild;
  (HTMLElement as any).prototype.appendChild = function(child: any) {
    initElement(this);
    initElement(child);

    if (!child) {
      return;
    }

    if (child.onUpdate !== undefined && !child.$cache.isListenUpdate) {
      child.$cache.isListenUpdate = true;

      child.$cache.onUpdate = child.onUpdate;
      child.$cache.onMemo = child.onMemo;
      child.$cache.lastMemo = child.onMemo ? child.onMemo(store.getState()) : [];

      store.addListen(child.$cache);
      child.onUpdate(child.$cache.lastMemo);
    }

    appendChild.call(this, child);
    this.$cache.childs.add(child);

    /** append 插入之后执行 */
    if (child.onAppend) {
      child.onAppend(child.$cache.lastMemo);
    }

    return this;
  };

  // append
  // const append = (HTMLElement as any).prototype.append;
  (HTMLElement as any).prototype.append = function(...args: any) {
    initElement(this);

    args.forEach((child: any) => {
      if (typeof child === 'object') {
        this.appendChild(child);
      }
    });

    return this;
  };

  /** helper make DOM in Like JSX */
  HTMLElement.prototype.setChilds = function(...args: any) {
    initElement(this);

    this.$cache.childs.forEach((v: any) => {
      if (v && v.remove) {
        v.remove();
      }
    });

    this.append(...args);

    return this;
  };

  HTMLElement.prototype.set = function(obj: any) {
    Object.keys(obj).forEach(k => {
      (this as any)[k] = obj[k];
    });

    return this;
  };

  HTMLElement.prototype.setEle = function(obj: (element: HTMLElement) => any) {
    obj(this);

    return this;
  };

  HTMLElement.prototype.setAttr = function(k: string, v: string) {
    this.setAttribute(k, v);

    return this;
  };

  HTMLElement.prototype.setStyle = function(obj: CSSStyleDeclaration | any) {
    Object.keys(obj).forEach(k => {
      (this as any).style[k] = obj[k];
    });

    return this;
  };

  HTMLElement.prototype.setClass = function(v: string) {
    this.setAttribute('class', v);

    return this;
  };

  HTMLElement.prototype.setRef = function(fn: (current: any) => any) {
    if (typeof fn === 'function') {
      fn(this);
    } else {
      (fn as any).ref = this;
    }

    return this;
  };
};

rewriteElement();
