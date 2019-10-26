import { IStyle, IProps } from './interface';
export declare function tid(): string;
declare type IInputDOM = IDOM<HTMLInputElement> & HTMLInputElement;
export interface IDOM<T> {
    __isVanilly: boolean;
    $ref: (fn: (ele: IDOM<T> & T) => any) => IDOM<T> & T;
    $id: (id: string) => IDOM<T> & T;
    $props: (obj: IProps) => IDOM<T> & T;
    /** get data from element */
    $getProp: (key: string, callback: (value: any) => any) => IDOM<T> & T;
    $text: (text: string | number | null) => IDOM<T> & T;
    $html: (html: string) => IDOM<T> & T;
    $val: (val: any) => IDOM<T> & T;
    $query(seletor: string, fn: (node: IInputDOM) => any, unfindable?: () => any): IDOM<T> & T;
    $queryAll(seletor: string, fn: (nodeList: HTMLInputElement[]) => any): IDOM<T> & T;
    $before: (newNode: HTMLInputElement) => IDOM<T> & T;
    $beforeQuery: (selectors: any, newNode: HTMLInputElement, unfindable?: () => any) => IDOM<T> & T;
    $insert: (position: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend', newNode: HTMLInputElement) => IDOM<T> & T;
    $append: (...nodes: any[]) => IDOM<T> & T;
    $children: (fn: (children: HTMLInputElement) => any) => IDOM<T> & T;
    $childWith: (fn: (node: HTMLInputElement, index: number) => any) => IDOM<T> & T;
    $parent: (fn: (node: HTMLInputElement) => any) => IDOM<T> & T;
    $attr: (key: string, value: any) => IDOM<T> & T;
    $cssText: (text: string) => IDOM<T> & T;
    /** use BEM replace(/\.\^/, ${${BEM}_}) */
    $class: (className: string, BEM?: string) => IDOM<T> & T;
    $classAdd: (className: string, BEM?: string) => IDOM<T> & T;
    $classRemove: (className: string, BEM?: string) => IDOM<T> & T;
    $classReplace: (oldClass: string, newClass: string, BEM?: string) => IDOM<T> & T;
    $style: (obj: IStyle) => IDOM<T> & T;
    $checkAppend: (fn: (self: IDOM<T> & T, timeOut?: number) => any) => IDOM<T> & T;
    $checkRemove: (fn: (self: IDOM<T> & T, timeOut?: number) => any) => IDOM<T> & T;
    $replace: (node: any) => IDOM<T> & T;
    $replaceChild: (nextNode: any, oldNode: any) => IDOM<T> & T;
    $replaceWith: (fn: (oldNode: any, index: number) => any) => IDOM<T> & T;
    $on: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLInputElement, ev: HTMLElementEventMap[K]) => any) => IDOM<T> & T;
    $listen: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLInputElement, ev: HTMLElementEventMap[K]) => any) => IDOM<T> & T;
    $unListen: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLInputElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions) => IDOM<T> & T;
    [key: string]: any;
}
export declare const toDOM: <T extends any>(element: T) => IDOM<T> & T;
export {};
