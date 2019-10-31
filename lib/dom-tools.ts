import { IStyle, IProps } from './interface';

export interface IInputEvent {
  target: {
    value: string;
  };
}

export type IOnInput = (this: IInputDOM, ev: HTMLElementEventMap['input']) => any;
export type IOnClick = (this: IInputDOM, ev: HTMLElementEventMap['click']) => any;

type IInputDOM = IDOM<HTMLInputElement> & HTMLInputElement;

export interface IDOM<T> {
  __isVanilly: boolean;
  $ref: (fn: (this: IInputDOM, ele: IDOM<T> & T) => any) => IDOM<T> & T;
  $id: (id: string) => IDOM<T> & T;
  $props: (obj: IProps) => IDOM<T> & T;
  /** get data from element */
  $getProp: (key: string, callback: (this: IInputDOM, value: any) => any) => IDOM<T> & T;
  $text: (text: any) => IDOM<T> & T;
  $getText: (fn: (text: string | number) => any) => IDOM<T> & T;
  $html: (html: string) => IDOM<T> & T;
  $val: (val: any) => IDOM<T> & T;
  $query(seletor: string, fn: (this: IInputDOM, node: IInputDOM) => any, unfindable?: () => any): IDOM<T> & T;
  $queryAll(seletor: string, fn: (this: IInputDOM, nodeList: HTMLInputElement[]) => any): IDOM<T> & T;
  $before: (newNode: Element) => IDOM<T> & T;
  $beforeQuery: (selector: any, newNode: Element, unfindable?: (this: IInputDOM) => any) => IDOM<T> & T;
  $insert: (position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend', newNode: Element) => IDOM<T> & T;
  $append: (...nodes: any[]) => IDOM<T> & T;
  $children: (fn: (this: IInputDOM, children: HTMLInputElement) => any) => IDOM<T> & T;
  $childWith: (fn: (this: IInputDOM, node: HTMLInputElement, index: number) => any) => IDOM<T> & T;
  $parent: (fn: (this: IInputDOM, node: HTMLInputElement) => any) => IDOM<T> & T;
  $attr: (key: string, value: any) => IDOM<T> & T;
  $cssText: (text: string) => IDOM<T> & T;
  /** use BEM replace(/\.\^/, ${${BEM}_}) */
  $class: (className: string, BEM?: string) => IDOM<T> & T;
  $classAdd: (className: string, BEM?: string) => IDOM<T> & T;
  $classRemove: (className: string, BEM?: string) => IDOM<T> & T;
  $classReplace: (oldClass: string, newClass: string, BEM?: string) => IDOM<T> & T;
  $classContains: (className: string, fn: (isContains: boolean) => any, BEM?: string) => IDOM<T> & T;
  $style: (obj: IStyle) => IDOM<T> & T;
  // Very slow, after append ues setTimout(fn, 40) find DOM, time out at 4000 ms
  $checkAppend: (fn: (this: IInputDOM, self: IInputDOM) => any, timeOut?: number) => IDOM<T> & T;
  $checkRemove: (fn: (this: IInputDOM, self: IInputDOM) => any, timeOut?: number) => IDOM<T> & T;
  $replace: (node: any) => IDOM<T> & T;
  $replaceChild: (nextNode: any, oldNode: any) => IDOM<T> & T;
  $replaceWith: (fn: (this: IInputDOM, oldNode: any, index: number) => any) => IDOM<T> & T;
  $on: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: IInputDOM, ev: HTMLElementEventMap[K] & IInputEvent) => any,
  ) => IDOM<T> & T;
  $addEvent: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: IInputDOM, ev: HTMLElementEventMap[K] & IInputEvent) => any,
  ) => IDOM<T> & T;
  $removeEvent: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: IInputDOM, ev: HTMLElementEventMap[K] & IInputEvent) => any,
    options?: boolean | EventListenerOptions,
  ) => IDOM<T> & T;
  [key: string]: any;
}

export const toDOM = <T extends any>(element: T): IDOM<T> & T => {
  if (element.__isVanilly) {
    return element as any;
  }

  element.__isVanilly = true;

  element.$ref = (fn: (ele: IDOM<T> & T) => any) => {
    fn.call(element, element as any);
    return element as any;
  };

  element.$id = (id: string) => {
    element.id = id;

    return element as any;
  };

  element.$on = <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: IInputDOM, ev: HTMLElementEventMap[K]) => any,
  ) => {
    element[`on${type}`] = listener;
    return element as any;
  };

  element.$addEvent = <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: IInputDOM, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ) => {
    element.addEventListener(type, listener, options);
    return element as any;
  };

  element.$removeEvent = <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: IInputDOM, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ) => {
    element.removeEventListener(type, listener, options);
    return element as any;
  };

  element.$html = (html: string) => {
    element.innerHTML = html;
    return element as any;
  };

  element.$text = (text: any) => {
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
  element.$getText = (fn: any) => {
    const eles = element.getElementsByClassName('set_span_text__');
    let el = eles ? eles[0] : null;

    if (el) {
      fn(el.textContent);
    }

    return element as any;
  };
  element.$val = (val: string) => {
    element.value = val;
    return element as any;
  };

  element.$query = (selector: any, fn: any, unfindable: any) => {
    const ele = element.querySelector(selector);
    if (ele) {
      fn.call(element, toDOM(ele));
    } else if (unfindable) {
      unfindable.call(element);
    }

    return element as any;
  };

  element.$queryAll = (selector: any, fn: any) => {
    fn.call(element, element.querySelectorAll(selector));

    return element as any;
  };

  element.$before = (newNode: HTMLInputElement) => {
    element.insertBefore(newNode, element);
    return element as any;
  };

  element.$beforeQuery = (selector: any, newNode: any, unfindable: any) => {
    const ele = element.querySelector(selector);
    if (ele) {
      element.insertBefore(newNode, ele);
    } else if (unfindable) {
      unfindable.call(element);
    }

    return element as any;
  };

  element.$insert = (position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend', newNode: HTMLElement) => {
    element.insertAdjacentElement(position, newNode);

    return element as any;
  };

  element.$append = (...nodes: any[]) => {
    element.append(...nodes.filter(Boolean));

    return element as any;
  };

  element.$children = (fn: (children: HTMLInputElement) => any) => {
    fn.call(element, element.children);

    return element as any;
  };

  element.$childWith = (fn: (node: HTMLInputElement, index: number) => any) => {
    for (let i = 0; i < element.children.length; i++) {
      const ele = element.children.item(i);
      fn.call(element, ele, i);
    }

    return element as any;
  };

  element.$parent = (fn: (node: HTMLInputElement) => any) => {
    if (element.parentElement) {
      fn.call(element, element.parentElement);
    }

    return element as any;
  };

  element.$props = (obj: any) => {
    Object.keys(obj).forEach(k => {
      element[k] = obj[k];
    });

    return element as any;
  };

  element.$getProp = (key: string, callback: Function) => {
    callback.call(element, element[key]);
    return element as any;
  };

  element.$attr = (key: string, value: any) => {
    if (value) {
      element.setAttribute(key, value);
    } else {
      element.removeAttribute(key);
    }
    return element as any;
  };

  element.$cssText = (text: string) => {
    element.style.cssText = text;
    return element as any;
  };

  /** BEM参数 将会查找字符串 ^， 替换为 ${BEM}_ */
  element.$class = (cssString: string, BEM?: string) => {
    if (BEM) {
      cssString = cssString.replace(/\^/g, `${BEM}-`);
    }
    element.setAttribute('class', cssString);
    return element as any;
  };

  element.$classAdd = (cssString: string, BEM?: string) => {
    if (BEM) {
      cssString = cssString.replace(/\^/g, `${BEM}-`);
    }
    element.classList.add(cssString);

    return element as any;
  };

  element.$classRemove = (cssString: string, BEM?: string) => {
    if (BEM) {
      cssString = cssString.replace(/\^/g, `${BEM}-`);
    }
    element.classList.remove(cssString);

    return element as any;
  };

  element.$classReplace = (oldClass: string, newClass: string, BEM?: string) => {
    if (BEM) {
      oldClass = oldClass.replace(/\^/g, `${BEM}-`);
      newClass = newClass.replace(/\^/g, `${BEM}-`);
    }
    element.classList.replace(oldClass, newClass);

    return element as any;
  };

  element.$classContains = (className: string, fn: (isContains: boolean) => any, BEM?: string) => {
    if (BEM) {
      className = className.replace(/\^/g, `${BEM}-`);
    }
    fn.call(element, element.classList.contains(className));
    return element as any;
  };

  element.$style = (obj: IStyle) => {
    Object.keys(obj).forEach(k => {
      element.style[k] = obj[k];
    });
    return element as any;
  };

  element.$checkAppend = (fn: (self: IDOM<T>) => any, timeOut: 4000) => {
    let t = 0;

    const findAndRunOnMound = () => {
      t += 50;
      const isHave = document.body.contains(element as any);
      if (isHave) {
        fn.call(element, element as any);
      } else if (t < timeOut) {
        setTimeout(findAndRunOnMound, 50);
      }
    };
    setTimeout(findAndRunOnMound);

    return element as any;
  };

  element.$checkRemove = (fn: (self: IDOM<T>) => any, timeOut: 4000) => {
    let t = 0;

    const findAndRunOnMound = () => {
      t += 50;
      const isHave = document.body.contains(element as any);
      if (!isHave) {
        fn.call(element, element as any);
      } else if (t < timeOut) {
        setTimeout(findAndRunOnMound, 50);
      }
    };
    setTimeout(findAndRunOnMound);

    return element as any;
  };

  element.$replace = (node: any) => {
    if (element.parentElement) {
      element.parentElement.replaceChild(node, element);
    }
    return element as any;
  };

  element.$replaceChild = (nextNode: any, oldNode: any) => {
    if (typeof oldNode === 'string') {
      oldNode = element.querySelector(oldNode);
    }
    if (oldNode) {
      element.replaceChild(nextNode, oldNode);
    }
    return element as any;
  };

  element.$replaceWith = (fn: (node: HTMLInputElement, index: number) => any) => {
    for (let i = 0; i < element.children.length; i++) {
      const ele = element.children.item(i);
      const nextNode = fn.call(element, ele, i);
      if (!nextNode.isEqualNode(ele)) {
        element.replaceChild(nextNode, ele);
      }
    }

    return element as any;
  };

  return element as any;
};
