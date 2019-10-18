(function() {
  if (window.history === undefined) {
    (window as any).history = {};
  }
  if (window.history.pushState === undefined) {
    (window as any).history.pushState = () => {
      (window as any).history.length += 1;
    };
  }
  if (window.history.replaceState === undefined) {
    (window as any).history.replaceState = () => {};
  }
  if (window.history.back === undefined) {
    (window as any).history.back = () => {
      (window as any).history.length -= 1;
    };
  }
  if (window.history.forward === undefined) {
    (window as any).history.forward = () => {};
  }
  if (window.history.go === undefined) {
    (window as any).history.go = () => {};
  }
  if (window.history.length === undefined) {
    (window as any).history.length = 0;
  }
  if (window.history.state === undefined) {
    (window as any).history.state = {};
  }
  if (window.history.scrollRestoration === undefined) {
    (window as any).history.scrollRestoration = () => {};
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
