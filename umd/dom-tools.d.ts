import { IStyle, IProps } from './interface';
export interface IDOM<T> {
    __isVanilly: boolean;
    ref: (fn: (ele: IDOM<T> & T) => any) => IDOM<T> & T;
    setId: (id: string) => IDOM<T> & T;
    setProps: (obj: IProps) => IDOM<T> & T;
    /** get data from element */
    getProp: (key: string, callback: (value: any) => any) => IDOM<T> & T;
    addEvent: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => IDOM<T> & T;
    removeEvent: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions) => IDOM<T> & T;
    setInnerText: (text: string) => IDOM<T> & T;
    setInnerHTML: (html: string) => IDOM<T> & T;
    setSpanText: (text: string | number | null) => IDOM<T> & T;
    query(seletor: string, fn: (node: IDOM<HTMLInputElement> & HTMLInputElement) => any, unfindable?: () => any): IDOM<T> & T;
    queryAll(seletor: string, fn: (nodeList: HTMLInputElement[]) => any): IDOM<T> & T;
    insertBefore: (newNode: HTMLInputElement) => IDOM<T> & T;
    queryInsertBefore: (selectors: any, newNode: HTMLInputElement, unfindable?: () => any) => IDOM<T> & T;
    queryInsertAdjacent: (position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend', newNode: HTMLInputElement) => IDOM<T> & T;
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
    onRendered: (fn: (self: IDOM<T> & T) => any) => IDOM<T> & T;
    render: (props?: any) => IDOM<T> & T;
    props: any;
    [key: string]: any;
}
export declare const toDOM: <T extends any>(element: T) => IDOM<T> & T;
