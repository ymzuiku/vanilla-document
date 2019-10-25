import { IDOM } from './dom-tools';
declare function IDOMCreator<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): IDOM<HTMLElementTagNameMap[K]> & HTMLElementTagNameMap[K];
declare function IDOMCreator<K extends Element>(tagNode?: K, options?: any): IDOM<K> & K;
interface IDOMExp {
    /** use BEM replace(/\^/, ${${BEM}_}) */
    appendCss: (css: string, BEM?: string) => any;
    appendStyle: (src: string, onload: string) => any;
    randomBEM: () => string;
    init: <K extends HTMLInputElement>(fn: <P extends any>(props: P) => any, nextProps?: any) => IDOM<K> & K;
}
/** Element operator */
export declare const DOM: typeof IDOMCreator & IDOMExp;
export {};
