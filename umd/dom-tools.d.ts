import { IStyle, IProps } from './interface';
export interface IInputEvent {
    target: {
        value: string;
    };
}
export declare type IOnInput = (this: IInputDOM, ev: HTMLElementEventMap['input']) => any;
export declare type IOnClick = (this: IInputDOM, ev: HTMLElementEventMap['click']) => any;
declare type IInputDOM = IDOM<HTMLInputElement> & HTMLInputElement;
export interface IDOM<T> {
    __isVanillaDOM: boolean;
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
    $checkAppend: (fn: (this: IInputDOM, self: IInputDOM) => any, timeOut?: number) => IDOM<T> & T;
    $checkRemove: (fn: (this: IInputDOM, self: IInputDOM) => any, timeOut?: number) => IDOM<T> & T;
    $replace: (node: any) => IDOM<T> & T;
    $replaceChild: (nextNode: any, oldNode: any) => IDOM<T> & T;
    $replaceWith: (fn: (this: IInputDOM, oldNode: any, index: number) => any) => IDOM<T> & T;
    $on: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: IInputDOM, ev: HTMLElementEventMap[K] & IInputEvent) => any) => IDOM<T> & T;
    $addEvent: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: IInputDOM, ev: HTMLElementEventMap[K] & IInputEvent) => any) => IDOM<T> & T;
    $removeEvent: <K extends keyof HTMLElementEventMap>(type: K, listener: (this: IInputDOM, ev: HTMLElementEventMap[K] & IInputEvent) => any, options?: boolean | EventListenerOptions) => IDOM<T> & T;
    $onStyle: (inEvent: string | null, outEvent: string | null, obj: IStyle) => IDOM<T> & T;
    $active: (obj: IStyle) => IDOM<T> & T;
    $hover: (obj: IStyle) => IDOM<T> & T;
    $focus: (obj: IStyle) => IDOM<T> & T;
    [key: string]: any;
}
export declare const toDOM: <T extends any>(element: T) => IDOM<T> & T;
export {};
