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
  ref: (fn: (ele: IDOM<T> & T) => any) => IDOM<T> & T;
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
  setSpanText: (text: string | number | null) => IDOM<T> & T;
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
  removeAttr: (key: string) => IDOM<T> & T;
  setCssText: (text: string) => IDOM<T> & T;
  /** use BEM replace(/\.\^/, ${${BEM}_}) */
  setCss: (className: string, BEM?: string) => IDOM<T> & T;
  setClassListAdd: (className: string, BEM?: string) => IDOM<T> & T;
  setClassListRemove: (className: string, BEM?: string) => IDOM<T> & T;
  setClassListReplace: (oldClass: string, newClass: string, BEM?: string) => IDOM<T> & T;
  setStyle: (obj: IStyle) => IDOM<T> & T;
  setOnClick: (event: Event) => IDOM<T> & T;
  // Very slow, after append ues setTimout(fn, 40) find DOM, time out at 4000 ms
  onRendered: (fn: (self: IDOM<T> & T) => any) => IDOM<T> & T;
  // onRender: (fn: (self: IDOM<T> & T, props: any) => any) => IDOM<T> & T;
  render: (props?: any) => IDOM<T> & T;
  props: any;
  [key: string]: any;
}

export const toDOM = <T extends any>(element: T): IDOM<T> & T => {
  if (!element.state) {
    element.state = {};
  }
  if (element.__isVanilly) {
    return element as any;
  }

  element.__isVanilly = true;

  element.ref = (fn: (ele: IDOM<T> & T) => any) => {
    fn.call(element, element as any);
    return element as any;
  };

  element.setId = (id: string) => {
    element.id = id;

    return element as any;
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

  element.setSpanText = (text: any) => {
    const eles = element.getElementsByClassName('set_span_text__');
    let el = eles ? eles[0] : null;

    if (!el) {
      el = document.createElement('span');
      el.id = 'text';
      el.setAttribute('class', 'set_span_text__');
      element.appendChild(el);
    }
    el.textContent = text;

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
    element.append(...nodes.filter(Boolean));

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

  element.setClassListAdd = (cssString: string, BEM?: string) => {
    if (BEM) {
      cssString = cssString.replace(/\^/g, `${BEM}-`);
    }
    element.classList.add(cssString);

    return element as any;
  };

  element.setClassListRemove = (cssString: string, BEM?: string) => {
    if (BEM) {
      cssString = cssString.replace(/\^/g, `${BEM}-`);
    }
    element.classList.remove(cssString);

    return element as any;
  };

  element.setClassListReplace = (oldClass: string, newClass: string, BEM?: string) => {
    if (BEM) {
      oldClass = oldClass.replace(/\^/g, `${BEM}-`);
      newClass = newClass.replace(/\^/g, `${BEM}-`);
    }
    element.classList.replace(oldClass, newClass);

    return element as any;
  };

  element.setStyle = (obj: IStyle) => {
    Object.keys(obj).forEach(k => {
      element.style[k] = obj[k];
    });
    return element as any;
  };

  element.onRendered = (fn: (self: IDOM<T>) => any) => {
    if (!element.id) {
      element.id =
        Date.now().toString(32) +
        Math.random()
          .toString(32)
          .slice(2);
    }

    const id = element.id;
    element.setAttribute('data-onRendered', '1');

    let timeout = 0;
    const findAndRunOnAppend = () => {
      timeout++;
      const nodeInDOM = document.getElementById(id);
      if (nodeInDOM) {
        fn.call(element, element as any);
      } else if (timeout < 100) {
        setTimeout(findAndRunOnAppend, 40);
      }
    };
    setTimeout(findAndRunOnAppend, 40);

    return element as any;
  };
  element.render = (props: any) => element;

  return element as any;
};
