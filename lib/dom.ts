import { IDOM, toDOM, tid } from './dom-tools';
import { media } from './media';

const cacheAppend = new Set<string>();

declare function IDOMCreator<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: ElementCreationOptions,
): IDOM<HTMLElementTagNameMap[K]> & HTMLElementTagNameMap[K];

declare function IDOMCreator<K extends Element>(tagNode?: K, options?: any): IDOM<K> & K;

interface IDOMExp {
  /** use BEM replace(/\^/, ${${BEM}_}) */
  css: (css: string, BEM?: string) => any;
  script: (src: string, onload: string) => any;
  randomBEM: () => string;
  tid: () => string;
}

/** Element operator */
export const DOM: typeof IDOMCreator & IDOMExp = (tag: any, options?: any) => {
  if (typeof tag === 'string') {
    const element = document.createElement(tag, options);
    return toDOM(element);
  }

  return toDOM(tag || document.createElement('div'));
};

DOM.css = (css: string, BEM?: string) => {
  const cacheCss = `${css}${BEM}`;
  if (!cacheAppend.has(cacheCss)) {
    const cssNode = document.createElement('style');
    if (css.indexOf('@media-') > -1) {
      Object.keys(media).forEach(k => {
        css = css.replace(k, (media as any)[k]);
      });
    }
    if (BEM) {
      css = css.replace(/\.\^/g, `.${BEM}-`);
    }
    cssNode.textContent = css;
    cssNode.type = 'text/css';
    document.head.appendChild(cssNode);
    cacheAppend.add(cacheCss);
  }
};

DOM.script = (src: string, onload?: any) => {
  if (!cacheAppend.has(src)) {
    const node = document.createElement('script');
    node.src = src;
    node.onload = onload;
    document.head.appendChild(node);
    cacheAppend.add(src);
  }
};

DOM.randomBEM = () => {
  return `BEM_${Date.now().toString(32)}${Math.random()
    .toString(32)
    .slice(2)}`;
};

DOM.tid = tid;
