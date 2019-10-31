import { IDOM, toDOM } from './dom-tools';
import { IStyle } from './interface';

declare function IDOMCreator<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: ElementCreationOptions,
): IDOM<HTMLElementTagNameMap[K]> & HTMLElementTagNameMap[K];

declare function IDOMCreator<K extends Element>(tagNode?: K, options?: any): IDOM<K> & K;

interface IDOMExp {
  /** use BEM replace(/\^/, ${${BEM}_}) */
  css: (css: string, BEM?: string) => any;
  script: (src?: string, textContent?: string, onload?: Function) => any;
  randomId: () => string;
  style: (obj: IStyle) => any;
}

/** Element operator */
export const dom: typeof IDOMCreator & IDOMExp = (tag: any, options?: any) => {
  if (typeof tag === 'string') {
    const element = document.createElement(tag, options);
    return toDOM(element);
  }

  return toDOM(tag || document.createElement('div'));
};

dom.css = (css: string, BEM?: string) => {
  const cssNode = document.createElement('style');
  if (BEM) {
    css = css.replace(/\.\^/g, `.${BEM}-`);
  }
  cssNode.textContent = css;
  cssNode.type = 'text/css';
  document.head.appendChild(cssNode);
};

dom.script = (src?: string, textContent?: string, onload?: any) => {
  const node = document.createElement('script');
  if (src) {
    node.src = src;
  }
  node.textContent = textContent || '';
  node.onload = onload;
  document.head.appendChild(node);
};

dom.randomId = () => {
  return `id${Date.now().toString(32)}${Math.random()
    .toString(32)
    .slice(2)}`;
};

dom.style = (obj: IStyle) => {
  return obj;
};
