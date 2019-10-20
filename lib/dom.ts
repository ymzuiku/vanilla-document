import { IDOM, toDOM } from './dom-tools';

declare function IDOMCreator<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: ElementCreationOptions,
): IDOM<HTMLElementTagNameMap[K]>;

declare function IDOMCreator<K extends Element>(tagNode?: K, options?: any): IDOM<K>;

/** Element operator */
export const DOM: typeof IDOMCreator = (tag: any, options?: any) => {
  if (typeof tag === 'string') {
    const element = document.createElement(tag, options);
    return toDOM(element);
  }

  return toDOM(tag || document.createElement('div'));
};
