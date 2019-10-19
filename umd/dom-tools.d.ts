import { IStyle } from './IStyle';
declare function IQuerySelector<K extends keyof HTMLElementTagNameMap>(selectors: K, fn: (ele: HTMLElementTagNameMap[K] | null) => any): IChain<HTMLElementTagNameMap[K]>;
declare function IQuerySelector<E extends Element = Element>(selectors: string, fn: (ele: E | null) => any): IChain<E>;
export interface IChain<T> {
    __isChain: true;
    element: T;
    ref: (fn: (selfChain: IChain<T>) => any) => IChain<T>;
    /** know from addEventListener, when remvoe element, auto removeEventListen */
    addEvent: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => IChain<T>;
    addEventListener: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => IChain<T>;
    removeEventListener: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions) => IChain<T>;
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
    keyframesSpring: (keyframesName: string, tension: number, wobble: number, fn: (value: number) => string) => IChain<T>;
    onUpdate: <S extends any, M extends any[]>(memo: (state: S) => M, fn: (memo: M, selfElement: T) => any) => IChain<T>;
    onAppend: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => IChain<T>;
    onRendered: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => IChain<T>;
    onRemove: <M extends Array<any>>(fn: (memo: M, selfElement: T) => any) => IChain<T>;
    [key: string]: any;
}
declare function IDOM<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): IChain<HTMLElementTagNameMap[K]>;
declare function IDOM<K extends HTMLElement>(tagNode?: K, options?: any): IChain<K>;
export declare const DOM: typeof IDOM;
export {};
