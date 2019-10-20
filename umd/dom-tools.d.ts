import { IStyle, IProps } from './interface';
declare function IQuerySelector<K extends keyof HTMLElementTagNameMap>(selectors: K, fn: (ele: HTMLElementTagNameMap[K]) => any, unfindable?: () => any): IDOM<HTMLElementTagNameMap[K]>;
declare function IQuerySelector<E extends Element = Element>(selectors: string, fn: (ele: E) => any, unfindable?: () => any): IDOM<E>;
declare function IQuerySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K, fn: (nodeList: HTMLElementTagNameMap[K][]) => any): IDOM<HTMLElementTagNameMap[K]>;
declare function IQuerySelectorAll<E extends Element = Element>(selectors: string, fn: (nodeList: E[]) => any): IDOM<E>;
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
    addEvent: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => IDOM<T>;
    addEventListener: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => IDOM<T>;
    removeEventListener: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions) => IDOM<T>;
    innerText: (text: string) => IDOM<T>;
    innerHTML: (html: string) => IDOM<T>;
    textContent: (text: string | number | null) => IDOM<T>;
    querySelector: typeof IQuerySelector;
    querySelectorAll: typeof IQuerySelectorAll;
    insertBefore: (selectors: any, newNode: HTMLElement, unfindable?: () => any) => IDOM<T>;
    insertAdjacentElement: (position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend', newNode: HTMLElement) => IDOM<T>;
    removeAllChildren: () => IDOM<T>;
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
    onAppend: <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T>) => any) => IDOM<T>;
    onRendered: <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T>) => any) => IDOM<T>;
    onRemove: <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T>) => any) => IDOM<T>;
    connectStore: (store: any, onUpdate: (state: any) => any, memo?: (state: any) => any) => IDOM<T>;
    [key: string]: any;
}
export declare const toDOM: <T extends any>(element: T) => IDOM<T>;
export {};
