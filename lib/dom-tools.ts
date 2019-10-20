import { ONUPDATE_KEY, ONAPPEND_KEY, ONREMOVE_KEY, ONRENDERED_KEY } from './commonCount';
import { store } from './dom-store';
import { IStyle, IProps } from './interface';
import * as device from './device';
import { keyframesSpring } from './keyframesSpring';
import { __values } from 'tslib';

const cssSet = new Set<string>();

document.createElement('input');

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
  fn: (ele: HTMLElementTagNameMap[K]) => any,
  unfindable?: () => any,
): IDOM<HTMLElementTagNameMap[K]>;

declare function IQuerySelector<E extends Element = Element>(
  selectors: string,
  fn: (ele: E) => any,
  unfindable?: () => any,
): IDOM<E>;

declare function IQuerySelectorAll<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  fn: (nodeList: HTMLElementTagNameMap[K][]) => any,
): IDOM<HTMLElementTagNameMap[K]>;

declare function IQuerySelectorAll<E extends Element = Element>(
  selectors: string,
  fn: (nodeList: E[]) => any,
): IDOM<E>;

export interface IDOM<T> {
  __isChain: true;
  element: T;
  getElement: (fn: (ele: T) => any) => IDOM<T>;
  ref: (fn: (selfChain: IDOM<T>) => any) => IDOM<T>;
  /**
   * bind props to element
   */
  props: (obj: IProps) => IDOM<T>;
  /** get data from element */
  getProp: (key: string, callback: (value: any) => any) => IDOM<T>;
  /** know from addEventListener, when remvoe element, auto removeEventListen */
  addEvent: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ) => IDOM<T>;
  addEventListener: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ) => IDOM<T>;
  removeEventListener: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ) => IDOM<T>;
  innerText: (text: string) => IDOM<T>;
  innerHTML: (html: string) => IDOM<T>;
  textContent: (text: string | number | null) => IDOM<T>;
  querySelector: typeof IQuerySelector;
  querySelectorAll: typeof IQuerySelectorAll;
  insertBefore: (selectors: any, newNode: HTMLElement, unfindable?: () => any) => IDOM<T>;
  insertAdjacentElement: (
    position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend',
    newNode: HTMLElement,
  ) => IDOM<T>;
  clearChildren: () => IDOM<T>;
  removeChild: (forEach: (node: HTMLElement, index: number) => any) => IDOM<T>;
  remove: () => IDOM<T>;
  append: (...nodes: any[]) => IDOM<T>;
  setAttribute: (key: string, value: any) => IDOM<T>;
  removeAttribute: (key: string) => IDOM<T>;
  cssText: (text: string) => IDOM<T>;
  /** use BEM replace(/\.\^/, ${${BEM}_}) */
  css: (className: string, BEM?: string) => IDOM<T>;
  /** use BEM replace(/\^/, ${${BEM}_}) */
  appendCss: (css: string, BEM?: string) => IDOM<T>;
  style: (obj: IStyle) => IDOM<T>;
  /** create keyframes use Spring */
  keyframesSpring: (keyframesName: string, tension: number, wobble: number, fn: (value: number) => string) => IDOM<T>;
  // listing store.update()
  onUpdate: <S extends any, M extends any[]>(
    memo: (state: S) => M,
    fn: (memo: M, selfElement: IDOM<T>) => any,
  ) => IDOM<T>;
  // After append to parent
  onAppend: <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T>) => any) => IDOM<T>;
  // Very slow, after append ues setTimout(fn, 40) find DOM, time out at 4000 ms
  onRendered: <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T>) => any) => IDOM<T>;
  // event by DOM.remove()
  onRemove: <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T>) => any) => IDOM<T>;
  [key: string]: any;
}

export function toDOM<T extends any>(element: T): IDOM<T> {
  let _DOM: IDOM<T> = {
    __isChain: true,
    element,
    getElement: (fn: (ele: T) => any) => {
      fn(element);
      return _DOM;
    },
    ref: (fn: (selfChain: IDOM<T>) => any) => {
      fn(_DOM as any);
      return _DOM;
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

      return _DOM;
    },
    addEventListener: <K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions,
    ) => {
      element.addEventListener(type, listener, options);
      return _DOM;
    },
    removeEventListener: <K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | EventListenerOptions,
    ) => {
      element.removeEventListener(type, listener, options);
      return _DOM;
    },
    innerText: (text: string) => {
      element.innerText = text;
      return _DOM;
    },
    innerHTML: (html: string) => {
      element.innerHTML = html;
      return _DOM;
    },
    textContent: text => {
      element.textContent = text;
      return _DOM;
    },
    querySelector: (selector: any, fn: any, unfindable: any) => {
      const ele = element.querySelector(selector);
      if (ele) {
        fn(ele);
      } else if (unfindable) {
        unfindable();
      }

      return _DOM;
    },
    querySelectorAll: (selector: any, fn: any) => {
      fn(element.querySelectorAll(selector));

      return _DOM;
    },
    insertBefore: (selector: any, newNode: any, unfindable: any) => {
      const ele = element.querySelector(selector);
      if (ele) {
        element.insertBefore(newNode, ele);
      } else if (unfindable) {
        unfindable();
      }

      return _DOM;
    },
    insertAdjacentElement: (
      position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend',
      newNode: HTMLElement,
    ) => {
      element.insertAdjacentElement(position, newNode);

      return _DOM;
    },
    clearChildren: () => {
      for (let i = 0; i < element.children.length; i++) {
        const ele = element.children.item(i);
        toDOM(ele).remove();
      }
      return _DOM;
    },
    removeChild: (forEach: (node: HTMLElement, index: number) => any) => {
      for (let i = 0; i < element.children.length; i++) {
        const ele = element.children.item(i);
        if (forEach(ele, i)) {
          toDOM(ele).remove();
        }
      }
      return _DOM;
    },
    remove: () => {
      _DOM.clearChildren();
      if (element.__onRemove) {
        element.__onRemove(element.__lastMemo, _DOM);
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
      element._DOM = null;
      element._state = null;
      element.remove();

      _DOM.element = null as any;
      _DOM = null as any;
      return _DOM;
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
            ele.__onAppend(ele.__lastMemo, _DOM);
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
                ele.__onRendered(ele.__lastMemo, _DOM);
              } else if (out < 100) {
                setTimeout(findAndRunOnAppend, 40);
              }
            };
            setTimeout(findAndRunOnAppend, 40);
          }
        }
      });

      return _DOM;
    },
    props: (obj: any) => {
      Object.keys(obj).forEach(k => {
        element[k] = obj[k];
      });
      return _DOM;
    },
    getProp: (key, callback) => {
      callback(element[key]);
      return _DOM;
    },
    setAttribute: (key: string, value: any) => {
      element.setAttribute(key, value);
      return _DOM;
    },
    removeAttribute: (key: string) => {
      element.removeAttribute(key);
      return _DOM;
    },
    cssText: (text: string) => {
      element.style.cssText = text;
      return _DOM;
    },
    /** BEM参数 将会查找字符串 .^， 替换为 .${BEM}- */
    appendCss: (css: string, BEM?: string) => {
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

      return _DOM;
    },
    /** BEM参数 将会查找字符串 ^， 替换为 ${BEM}_ */
    css: (cssString: string, BEM?: string) => {
      if (BEM) {
        cssString = cssString.replace(/\^/g, `${BEM}-`);
      }
      element.setAttribute('class', cssString);
      return _DOM;
    },
    style: (obj: IStyle) => {
      Object.keys(obj).forEach(k => {
        element.style[k] = obj[k];
      });
      return _DOM;
    },
    keyframesSpring: (name: string, tension: number, wobble: number, fn: (value: number) => string) => {
      if (!cssSet.has(name)) {
        const cssNode = document.createElement('style');
        const css = keyframesSpring(name, tension, wobble, fn);

        cssNode.textContent = css;
        document.head.appendChild(cssNode);

        cssSet.add(name);
      }

      return _DOM;
    },
    onUpdate: <S extends any, M extends any[]>(memo: (state: S) => M, fn: (memo: M, _DOM: IDOM<T>) => any) => {
      element.__onMemo = memo;
      element.__onUpdate = fn;
      element.setAttribute(ONUPDATE_KEY, '1');
      return _DOM;
    },
    onAppend: <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T>) => any) => {
      element.__onAppend = fn;
      element.setAttribute(ONAPPEND_KEY, '1');
      return _DOM;
    },
    onRendered: <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T>) => any) => {
      element.__onRendered = fn;
      element.setAttribute(ONRENDERED_KEY, '1');
      return _DOM;
    },
    onRemove: <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T>) => any) => {
      element.__onRemove = fn;
      element.setAttribute(ONREMOVE_KEY, '1');
      return _DOM;
    },
  };

  if (element) {
    element._DOM = _DOM;
  }

  return _DOM as any;
}
