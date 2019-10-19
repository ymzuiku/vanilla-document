import { IStyle } from './IStyle';
declare function IQuerySelector<K extends keyof HTMLElementTagNameMap>(selectors: K, fn: (ele: HTMLElementTagNameMap[K] | null) => any): IDOM<HTMLElementTagNameMap[K]>;
declare function IQuerySelector<E extends Element = Element>(selectors: string, fn: (ele: E | null) => any): IDOM<E>;
export interface IDOM<T> {
    __isChain: true;
    element: T;
    getElement: (fn: (ele: T) => any) => IDOM<T>;
    ref: (fn: (selfChain: IDOM<T>) => any) => IDOM<T>;
    /** know from addEventListener, when remvoe element, auto removeEventListen */
    addEvent: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => IDOM<T>;
    addEventListener: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => IDOM<T>;
    removeEventListener: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions) => IDOM<T>;
    innerText: (text: string) => IDOM<T>;
    innerHTML: (html: string) => IDOM<T>;
    textContent: (text: string | null) => IDOM<T>;
    querySelector: typeof IQuerySelector;
    clearChildren: () => IDOM<T>;
    removeChild: (forEach: (node: HTMLElement, index: number) => any) => IDOM<T>;
    remove: () => IDOM<T>;
    append: (...nodes: any[]) => IDOM<T>;
    setProps: (obj: any) => IDOM<T>;
    setAttribute: (key: string, value: any) => IDOM<T>;
    removeAttribute: (key: string) => IDOM<T>;
    cssText: (text: string) => IDOM<T>;
    /** use BEM replace(/\.\^/, ${${BEM}_}) */
    class: (className: string, BEM?: string) => IDOM<T>;
    /** use BEM replace(/\^/, ${${BEM}_}) */
    css: (css: string, BEM?: string) => IDOM<T>;
    updateClass: (fn: any) => IDOM<T>;
    style: (obj: IStyle) => IDOM<T>;
    /** create keyframes use Spring */
    keyframesSpring: (keyframesName: string, tension: number, wobble: number, fn: (value: number) => string) => IDOM<T>;
    onUpdate: <S extends any, M extends any[]>(memo: (state: S) => M, fn: (memo: M, selfElement: T) => any) => IDOM<T>;
    onAppend: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => IDOM<T>;
    onRendered: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => IDOM<T>;
    onRemove: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => IDOM<T>;
    [key: string]: any;
}
declare function IDOMCreator<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): IDOM<HTMLElementTagNameMap[K]>;
declare function IDOMCreator<K extends HTMLElement>(tagNode?: K, options?: any): IDOM<K>;
export declare const DOM: typeof IDOMCreator;
export {};
