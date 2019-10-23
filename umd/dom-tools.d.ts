import { IStyle, IProps } from './interface';
declare function IQuerySelector<K extends keyof HTMLElementTagNameMap>(selectors: K, fn: (ele: HTMLElementTagNameMap[K]) => any, unfindable?: () => any): IDOM<HTMLElementTagNameMap[K]>;
declare function IQuerySelector<E extends Element = Element>(selectors: string, fn: (ele: E) => any, unfindable?: () => any): IDOM<E>;
declare function IQuerySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K, fn: (nodeList: HTMLElementTagNameMap[K][]) => any): IDOM<HTMLElementTagNameMap[K]>;
declare function IQuerySelectorAll<E extends Element = Element>(selectors: string, fn: (nodeList: E[]) => any): IDOM<E>;
export interface IDOM<T> {
    __isVanilly: boolean;
    getElement: (fn: (ele: T) => any) => IDOM<T> & T;
    /**
     * bind props to element
     */
    setProps: (obj: IProps) => IDOM<T> & T;
    /** get data from element */
    getProp: (key: string, callback: (value: any) => any) => IDOM<T> & T;
    addEvent: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => IDOM<T> & T;
    removeEvent: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions) => IDOM<T> & T;
    setInnerText: (text: string) => IDOM<T> & T;
    setInnerHTML: (html: string) => IDOM<T> & T;
    setText: (text: string | number | null) => IDOM<T> & T;
    query: typeof IQuerySelector;
    queryAll: typeof IQuerySelectorAll;
    queryInsertBefore: (selectors: any, newNode: HTMLInputElement, unfindable?: () => any) => IDOM<T> & T;
    queryInsertAdjacent: (position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend', newNode: HTMLInputElement) => IDOM<T> & T;
    setAppend: (...nodes: any[]) => IDOM<T> & T;
    getChildren: (fn: (children: HTMLInputElement) => any) => IDOM<T> & T;
    forEachChildren: (fn: (node: HTMLInputElement, index: number) => any) => IDOM<T> & T;
    setAttr: (key: string, value: any) => IDOM<T> & T;
    removeAttri: (key: string) => IDOM<T> & T;
    setCssText: (text: string) => IDOM<T> & T;
    /** use BEM replace(/\.\^/, ${${BEM}_}) */
    setCss: (className: string, BEM?: string) => IDOM<T> & T;
    setStyle: (obj: IStyle) => IDOM<T> & T;
    onAppend: <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T> & T) => any) => IDOM<T> & T;
    onRendered: <M extends Array<any>>(fn: (memo: M, _DOM: IDOM<T> & T) => any) => IDOM<T> & T;
}
export declare const toDOM: <T extends any>(element: T) => IDOM<T> & T;
export {};
