import { IDOM } from './dom-tools';
declare function IDOMCreator<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): IDOM<HTMLElementTagNameMap[K]> & HTMLElementTagNameMap[K];
declare function IDOMCreator<K extends Element>(tagNode?: K, options?: any): IDOM<K> & K;
interface IDOMExp {
    /** use BEM replace(/\^/, ${${BEM}_}) */
    css: (css: string, BEM?: string) => any;
    script: (src: string, onload: string) => any;
    randomBEM: () => string;
    tid: () => string;
}
/** Element operator */
export declare const DOM: typeof IDOMCreator & IDOMExp;
export {};
