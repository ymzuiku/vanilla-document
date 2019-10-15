export const DOM = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: ElementCreationOptions
): HTMLElementTagNameMap[K] => {
  return document.createElement(tagName, options);
};
