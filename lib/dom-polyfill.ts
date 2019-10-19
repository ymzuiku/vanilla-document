(function() {
  const props = ['pushState', 'replaceState', 'back', 'forward', 'go', 'scrollRestoration'];
  if (window.history === undefined) {
    (window as any).history = {
      length: 0,
      state: {},
    };
    props.forEach(k => {
      if ((window as any).history[k] === undefined) {
        (window as any).history[k] = () => {};
      }
    });
  } else {
    props.forEach(k => {
      if ((window as any).history[k] === undefined) {
        (window as any).history[k] = () => {};
      }
    });
  }
})();

(function(arr) {
  arr.forEach(function(item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        (this as any).parentNode.removeChild(this);
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

(function(arr) {
  arr.forEach(function(item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append(...args: any[]) {
        args.forEach(v => {
          (this as HTMLElement).appendChild(v);
        });
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

export const dom_polyfill = true;
