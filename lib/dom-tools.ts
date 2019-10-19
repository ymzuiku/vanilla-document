import { ONUPDATE_KEY, ONAPPEND_KEY, ONREMOVE_KEY, ONRENDERED_KEY } from './commonCount';
import { store } from './dom-store';
import { IStyle } from './IStyle';
import * as device from './device';
import { keyframesSpring } from './keyframesSpring';

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

declare function IQuerySelector<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  fn: (ele: HTMLElementTagNameMap[K] | null) => any,
): IChain<HTMLElementTagNameMap[K]>;
declare function IQuerySelector<E extends Element = Element>(selectors: string, fn: (ele: E | null) => any): IChain<E>;

export interface IChain<T> {
  __isChain: true;
  element: T;
  ref: (fn: (selfChain: IChain<T>) => any) => IChain<T>;
  /** know from addEventListener, when remvoe element, auto removeEventListen */
  addEvent: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ) => IChain<T>;
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
  querySelector: typeof IQuerySelector;
  clearChildren: () => IChain<T>;
  removeChild: (forEach: (node: HTMLElement, index: number) => any) => IChain<T>;
  remove: () => IChain<T>;
  append: (...nodes: any[]) => IChain<T>;
  setProps: (obj: any) => IChain<T>;
  setAttribute: (key: string, value: any) => IChain<T>;
  removeAttribute: (key: string) => IChain<T>;
  cssText: (text: string) => IChain<T>;
  /** use BEM replace(/\.\^/, ${${BEM}_}) */
  class: (className: string, BEM?: string) => IChain<T>;
  /** use BEM replace(/\^/, ${${BEM}_}) */
  css: (css: string, BEM?: string) => IChain<T>;
  updateClass: (fn: any) => IChain<T>;
  style: (obj: IStyle) => IChain<T>;
  /** create keyframes use Spring */
  keyframesSpring: (
    keyframesName: string,
    tension: number,
    wobble: number,
    fn: (value: number) => string,
  ) => IChain<T>;
  // listing store.update()
  onUpdate: <S extends any, M extends any[]>(memo: (state: S) => M, fn: (memo: M, selfElement: T) => any) => IChain<T>;
  // After append to parent
  onAppend: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => IChain<T>;
  // Very slow, after append ues setTimout(fn, 40) find DOM, time out at 4000 ms
  onRendered: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => IChain<T>;
  // event by DOM.remove()
  onRemove: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => IChain<T>;
  [key: string]: any;
}

function toDOM<T extends any>(element: T): IChain<T> {
  const chain: IChain<T> = {
    __isChain: true,
    element,
    ref: (fn: (selfChain: IChain<T>) => any) => {
      fn(chain as any);
      return chain;
    },
    addEvent: <K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions,
    ) => {
      if (!element.__events) {
        element.__events = new Set<any>();
      }
      element.__events.add([type, listener, options]);
      element.addEventListener(type, listener, options);

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
    querySelector: (selector: any, fn: any) => {
      fn(chain.element.querySelector(selector));
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
      // 如果有自动绑定的事件，当元素移除时，会自动移除事件
      if (element.__events) {
        element.__events.forEach((event: any) => {
          element.removeEventListener(...event);
        });
        element.__events.clear();
        element.__events = null;
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
    /** BEM参数 将会查找字符串 .^， 替换为 .${BEM}- */
    css: (css: string, BEM?: string) => {
      const cacheCss = `${css}${BEM}`;
      if (!cssSet.has(cacheCss)) {
        const cssNode = document.createElement('style');
        if (css.indexOf('@media-') > -1) {
          Object.keys(media).forEach(k => {
            css = css.replace(k, (media as any)[k]);
          });
        }
        if (BEM) {
          css = css.replace(/\.\^/g, `.${BEM}-`);
        }
        cssNode.textContent = css;
        document.head.appendChild(cssNode);
        cssSet.add(cacheCss);
      }

      return chain;
    },
    /** BEM参数 将会查找字符串 ^， 替换为 ${BEM}_ */
    class: (cssString: string, BEM?: string) => {
      if (BEM) {
        cssString = cssString.replace(/\^/g, `${BEM}-`);
      }
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
    keyframesSpring: (name: string, tension: number, wobble: number, fn: (value: number) => string) => {
      if (!cssSet.has(name)) {
        const cssNode = document.createElement('style');
        const css = keyframesSpring(name, tension, wobble, fn);

        cssNode.textContent = css;
        document.head.appendChild(cssNode);

        cssSet.add(name);
      }

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

declare function IDOM<K extends HTMLElement>(tagNode?: K, options?: any): IChain<K>;

export const DOM: typeof IDOM = (tag: any, options?: any) => {
  if (typeof tag === 'string') {
    const element = document.createElement(tag, options);
    return toDOM(element);
  }

  return toDOM(tag || document.createElement('div'));
};
