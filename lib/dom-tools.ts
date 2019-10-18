import { ONUPDATE_KEY, ONAPPEND_KEY, ONREMOVE_KEY, ONRENDERED_KEY } from './commonCount';
import { store } from './dom-store';
import { IStyle } from './IStyle';
import * as device from './device';

const cssSet = new Set<string>();

const media = {
  '@media-sm': `@media (min-width: 640px)`,
  '@media-md': '@media (min-width: 768px)',
  '@media-lg': '@media (min-width: 1024px)',
  '@media-xl': '@media (min-width: 1280px)',
  '@media-ios': `@media (min-width: ${device.isIos ? '0px' : '9999px'})`,
  '@media-android': `@media (min-width: ${device.isAndroid ? '0px' : '9999px'})`,
  '@media-pc': `@media (min-width: ${device.isPc ? '0px' : '9999px'})`,
  '@media-phone': `@media (min-width: ${!device.isPc ? '0px' : '9999px'})`,
  '@media-wechat': `@media (min-width: ${!device.isWechat ? '0px' : '9999px'})`,
  '@media-pad': `@media (min-width: ${!device.isPad ? '0px' : '9999px'})`,
};

export interface IChain<T> {
  __isChain: true;
  element: T;
  ref: (fn: (selfChain: IChain<T>) => any) => IChain<T>;
  addEventListener: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ) => IChain<T>;
  removeEventListener: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ) => IChain<T>;
  innerText: (text: string) => IChain<T>;
  innerHTML: (html: string) => IChain<T>;
  textContent: (text: string) => IChain<T>;
  children: (fn: (nodes: HTMLElement[]) => any) => IChain<T>;
  clearChildren: () => IChain<T>;
  removeChild: (forEach: (node: HTMLElement, index: number) => any) => IChain<T>;
  remove: () => IChain<T>;
  append: (...nodes: any[]) => IChain<T>;
  setProps: (obj: any) => IChain<T>;
  setAttribute: (key: string, value: any) => IChain<T>;
  removeAttribute: (key: string) => IChain<T>;
  cssText: (text: string) => IChain<T>;
  class: (className: string) => IChain<T>;
  css: (css: string) => IChain<T>;
  updateClass: (fn: any) => IChain<T>;
  style: (obj: IStyle) => IChain<T>;
  // listing store.update()
  onUpdate: <S extends any, M extends any[]>(memo: (state: S) => M, fn: (memo: M, selfElement: T) => any) => IChain<T>;
  // After append to parent
  onAppend: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => IChain<T>;
  // Very slow, after append ues setTimout(fn, 40) find DOM, time out at 4000 ms
  onRendered: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => IChain<T>;
  // event by DOM.remove()
  onRemove: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => IChain<T>;
}

function toDOM<T extends any>(element: T): IChain<T> {
  const chain: IChain<T> = {
    __isChain: true,
    element,
    ref: (fn: (selfChain: IChain<T>) => any) => {
      fn(chain as any);
      return chain;
    },
    addEventListener: <K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions,
    ) => {
      element.addEventListener(type, listener, options);
      return chain;
    },
    removeEventListener: <K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | EventListenerOptions,
    ) => {
      element.removeEventListener(type, listener, options);
      return chain;
    },
    innerText: (text: string) => {
      element.innerText = text;
      return chain;
    },
    innerHTML: (html: string) => {
      element.innerHTML = html;
      return chain;
    },
    textContent: (text: string) => {
      element.textContent = text;
      return chain;
    },
    children: (fn: (nodes: HTMLElement[]) => any) => {
      const originChildren = [] as any;

      for (let i = 0; i < element.children.length; i++) {
        originChildren.push(element.children.item(i));
      }
      fn(originChildren);
      return chain;
    },
    clearChildren: () => {
      for (let i = 0; i < element.children.length; i++) {
        const ele = element.children.item(i);
        toDOM(ele).remove();
      }
      return chain;
    },
    removeChild: (forEach: (node: HTMLElement, index: number) => any) => {
      for (let i = 0; i < element.children.length; i++) {
        const ele = element.children.item(i);
        if (forEach(ele, i)) {
          toDOM(ele).remove();
        }
      }
      return chain;
    },
    remove: () => {
      chain.clearChildren();
      if (element.__onRemove) {
        element.__onRemove(element.__lastMemo, element);
        store.__listenNodes.delete(element);
      }
      element.remove();
      return chain;
    },
    append: (...nodes: any[]) => {
      nodes.forEach((v: any) => {
        if (v) {
          const ele = v.__isChain ? v.element : v;
          if (ele.__onUpdate) {
            if (!store.__listenNodes.has(ele)) {
              store.__listenNodes.add(ele);
            }
          }
          element.appendChild(ele);
          if (ele.__onAppend) {
            ele.__onAppend(ele.__lastMemo, ele);
          }

          if (ele.__onRendered) {
            if (!ele.id) {
              ele.id = Math.random()
                .toString(16)
                .slice(2);
            }

            let out = 0;
            const findAndRunOnAppend = () => {
              out++;
              const nodeInDOM = document.getElementById(ele.id);
              if (nodeInDOM) {
                ele.__onRendered(ele.__lastMemo, ele);
              } else if (out < 100) {
                setTimeout(findAndRunOnAppend, 40);
              }
            };
            setTimeout(findAndRunOnAppend, 40);
          }
        }
      });

      return chain;
    },
    setProps: (obj: any) => {
      Object.keys(obj).forEach(k => {
        element[k] = obj[k];
      });
      return chain;
    },
    setAttribute: (key: string, value: any) => {
      element.setAttribute(key, value);
      return chain;
    },
    removeAttribute: (key: string) => {
      element.removeAttribute(key);
      return chain;
    },
    cssText: (text: string) => {
      element.style.cssText = text;
      return chain;
    },
    css: (css: string) => {
      if (!cssSet.has(css)) {
        const cssNode = document.createElement('style');
        if (css.indexOf('@media-') > -1) {
          Object.keys(media).forEach(k => {
            css = css.replace(k, (media as any)[k]);
          });
        }
        cssNode.textContent = css;
        console.log(css);
        document.head.appendChild(cssNode);
      }

      return chain;
    },
    class: (cssString: string) => {
      element.setAttribute('class', cssString);
      return chain;
    },
    updateClass: (fn: any) => {
      if (typeof fn === 'string') {
        element.setAttribute('class', (element.className || '') + fn);
      } else {
        const cssString = fn(element.className || '');

        element.setAttribute('class', cssString);
      }

      return chain;
    },
    style: (obj: IStyle) => {
      Object.keys(obj).forEach(k => {
        element.style[k] = obj[k];
      });
      return chain;
    },
    onUpdate: <S extends any, M extends any[]>(memo: (state: S) => M, fn: (memo: M, selfElement: T) => any) => {
      element.__onMemo = memo;
      element.__onUpdate = fn;
      element.setAttribute(ONUPDATE_KEY, '1');
      return chain;
    },
    onAppend: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => {
      element.__onAppend = fn;
      element.setAttribute(ONAPPEND_KEY, '1');
      return chain;
    },
    onRendered: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => {
      element.__onRendered = fn;
      element.setAttribute(ONRENDERED_KEY, '1');
      return chain;
    },
    onRemove: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => {
      element.__onRemove = fn;
      element.setAttribute(ONREMOVE_KEY, '1');
      return chain;
    },
  };

  return chain as any;
}

declare function IDOM<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: ElementCreationOptions,
): IChain<HTMLElementTagNameMap[K]>;

declare function IDOM<K extends HTMLElement>(tagNode: K, options?: any): IChain<K>;

export const DOM: typeof IDOM = (tag: any, options?: any) => {
  if (typeof tag === 'string') {
    const element = document.createElement(tag, options);
    return toDOM(element);
  }

  return toDOM(tag);
};
