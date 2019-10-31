import { IDOM } from './dom-tools';
import { IStyle } from './interface';
declare function IDOMCreator<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): IDOM<HTMLElementTagNameMap[K]> & HTMLElementTagNameMap[K];
declare function IDOMCreator<K extends Element>(tagNode?: K, options?: any): IDOM<K> & K;
interface IDOMExp {
    /** use BEM replace(/\^/, ${${BEM}_}) */
    css: (css: string, BEM?: string) => any;
    script: (src?: string, textContent?: string, onload?: Function) => any;
    randomId: () => string;
    style: (obj: IStyle) => any;
}
/** Element operator */
export declare const dom: typeof IDOMCreator & IDOMExp;
export {};
