import { UPDATE_KEY } from './commonCount';

export const DOM = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: ElementCreationOptions,
): HTMLElementTagNameMap[K] => {
  return document.createElement(tagName, options);
};

export function append<T extends any>(target: T, nodes: any[]) {
  (target as any).append(...nodes);
  return target;
}

export function setProps<T extends any>(target: T, obj: any) {
  Object.keys(obj).forEach(k => {
    (target as any)[k] = obj[k];
  });
  return target;
}

export function setClass<T extends any>(target: T, cssString: string) {
  (target as any).setAttribute('class', cssString);

  return target;
}

export function onUpdate<T extends any, S extends any>(
  target: HTMLElement,
  memo: (state: T) => S,
  updater: (memo: S) => any,
) {
  (target as any).__onUpdate = updater;
  (target as any).__onMemo = memo;
  target.setAttribute(UPDATE_KEY, '1');
  return target;
}

export function onAppend(target: HTMLElement, fn: any) {
  (target as any).__onAppend = fn;
  return target;
}

export function onRemove(target: HTMLElement, fn: any) {
  (target as any).__onRemove = fn;
  return target;
}
