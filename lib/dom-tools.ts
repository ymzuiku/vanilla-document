import { IStyle, IProps } from './interface';

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
  __isVanilly: boolean;
  getElement: (fn: (ele: T) => any) => IDOM<T> & T;
  setId: (id: string) => IDOM<T> & T;
  setProps: (obj: IProps) => IDOM<T> & T;
  /** get data from element */
  getProp: (key: string, callback: (value: any) => any) => IDOM<T> & T;
  addEvent: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ) => IDOM<T> & T;
  removeEvent: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ) => IDOM<T> & T;
  setInnerText: (text: string) => IDOM<T> & T;
  setInnerHTML: (html: string) => IDOM<T> & T;
  setText: (text: string | number | null) => IDOM<T> & T;
  query(
    seletor: string,
    fn: (node: IDOM<HTMLInputElement> & HTMLInputElement) => any,
    unfindable?: () => any,
  ): IDOM<T> & T;
  queryAll(seletor: string, fn: (nodeList: HTMLInputElement[]) => any): IDOM<T> & T;
  insertBefore: (newNode: HTMLInputElement) => IDOM<T> & T;
  queryInsertBefore: (selectors: any, newNode: HTMLInputElement, unfindable?: () => any) => IDOM<T> & T;
  queryInsertAdjacent: (
    position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend',
    newNode: HTMLInputElement,
  ) => IDOM<T> & T;
  setAppend: (...nodes: any[]) => IDOM<T> & T;
  getChildren: (fn: (children: HTMLInputElement) => any) => IDOM<T> & T;
  forEachChildren: (fn: (node: HTMLInputElement, index: number) => any) => IDOM<T> & T;
  setAttr: (key: string, value: any) => IDOM<T> & T;
  removeAttri: (key: string) => IDOM<T> & T;
  setCssText: (text: string) => IDOM<T> & T;
  /** use BEM replace(/\.\^/, ${${BEM}_}) */
  setCss: (className: string, BEM?: string) => IDOM<T> & T;
  setStyle: (obj: IStyle) => IDOM<T> & T;
  // After append to parent
  onAppend: <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T> & T) => any) => IDOM<T> & T;
  // Very slow, after append ues setTimout(fn, 40) find DOM, time out at 4000 ms
  onRendered: <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T> & T) => any) => IDOM<T> & T;
}

export const toDOM = <T extends any>(element: T): IDOM<T> & T => {
  if (element.__isVanilly) {
    return element as any;
  }

  element.__isVanilly = true;
  element.getElement = (fn: (ele: T) => any) => {
    fn.call(element, element);
    return element as any;
  };
  element.setId = (id: string) => {
    element.id = id;
  };
  element.addEvent = <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ) => {
    element.addEventListener(type, listener, options);
    return element as any;
  };
  element.removeEvent = <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ) => {
    element.removeEventListener(type, listener, options);
    return element as any;
  };
  element.setInnerText = (text: string) => {
    element.innerText = text;
    return element as any;
  };
  element.setInnerHTML = (html: string) => {
    element.innerHTML = html;
    return element as any;
  };
  element.setText = (text: any) => {
    element.textContent = text;
    return element as any;
  };
  element.query = (selector: any, fn: any, unfindable: any) => {
    const ele = element.querySelector(selector);
    if (ele) {
      fn.call(element, toDOM(ele));
    } else if (unfindable) {
      unfindable.call(element);
    }

    return element as any;
  };
  element.queryAll = (selector: any, fn: any) => {
    fn.call(element, element.querySelectorAll(selector));

    return element as any;
  };
  element.insertBefore = (newNode: HTMLInputElement) => {
    element.insertBefore(newNode, element);
    return element as any;
  };
  element.queryInsertBefore = (selector: any, newNode: any, unfindable: any) => {
    const ele = element.querySelector(selector);
    if (ele) {
      element.insertBefore(newNode, ele);
    } else if (unfindable) {
      unfindable();
    }

    return element as any;
  };
  element.queryInsertAdjacent = (
    position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend',
    newNode: HTMLElement,
  ) => {
    element.insertAdjacentElement(position, newNode);

    return element as any;
  };
  element.setAppend = (...nodes: any[]) => {
    nodes.forEach((v: any) => {
      if (v) {
        element.appendChild(v);
        if (v.__onAppend) {
          v.__onAppend.call(v, v);
        }

        if (v.__onRendered) {
          let timeout = 0;
          const findAndRunOnAppend = () => {
            timeout++;
            const nodeInDOM = document.getElementById(v.__onRenderedId);
            if (nodeInDOM) {
              v.__onRendered.call(v, v);
            } else if (timeout < 100) {
              setTimeout(findAndRunOnAppend, 40);
            }
          };
          setTimeout(findAndRunOnAppend, 40);
        }
      }
    });

    return element as any;
  };

  element.getChildren = (fn: (children: HTMLInputElement) => any) => {
    fn.call(element, element.children);

    return element as any;
  };
  element.forEachChildren = (fn: (node: HTMLInputElement, index: number) => any) => {
    for (let i = 0; i < element.children.length; i++) {
      const ele = element.children.item(i);
      fn.call(element, ele, i);
    }

    return element as any;
  };
  element.setProps = (obj: any) => {
    Object.keys(obj).forEach(k => {
      element[k] = obj[k];
    });

    return element as any;
  };
  element.getProp = (key: string, callback: Function) => {
    callback.call(element, element[key]);
    return element as any;
  };
  element.setAttr = (key: string, value: any) => {
    element.setAttribute(key, value);
    return element as any;
  };
  element.removeAttr = (key: string) => {
    element.removeAttribute(key);
    return element as any;
  };
  element.setCssText = (text: string) => {
    element.style.cssText = text;
    return element as any;
  };
  /** BEM参数 将会查找字符串 ^， 替换为 ${BEM}_ */
  element.setCss = (cssString: string, BEM?: string) => {
    if (BEM) {
      cssString = cssString.replace(/\^/g, `${BEM}-`);
    }
    element.setAttribute('class', cssString);
    return element as any;
  };
  element.setStyle = (obj: IStyle) => {
    Object.keys(obj).forEach(k => {
      element.style[k] = obj[k];
    });
    return element as any;
  };
  element.onAppend = <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T>) => any) => {
    element.__onAppend = fn;

    return element as any;
  };
  element.onRendered = <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T>) => any) => {
    element.__onRendered = fn;
    const id =
      Math.random()
        .toString(16)
        .slice(2) + Date.now().toString(16);
    const spen = document.createElement('span');
    spen.style.cssText = 'padding:0px; margin:0px; background:rgba(0,0,0,0);';
    spen.id = id;
    element.__onRenderedId = id;
    element.append(spen);

    return element as any;
  };

  return element as any;
};
