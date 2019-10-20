import { IDOM } from './dom-tools';
declare function IDOMCreator<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): IDOM<HTMLElementTagNameMap[K]>;
declare function IDOMCreator<K extends Element>(tagNode?: K, options?: any): IDOM<K>;
/** Element operator */
export declare const DOM: typeof IDOMCreator;
export {};
