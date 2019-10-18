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

// window.requestAnimationFrame polyfill
(function(w) {
  var hasPerformance = !!(window.performance && window.performance.now);

  // Add new wrapper for browsers that don't have performance
  if (!hasPerformance) {
    // Store reference to existing rAF and initial startTime
    var rAF = window.requestAnimationFrame as any,
      startTime = +new Date();

    // Override window rAF to include wrapped callback
    (window as any).requestAnimationFrame = function(callback: any, element: any) {
      // Wrap the given callback to pass in performance timestamp
      var wrapped = function(timestamp: any) {
        // Get performance-style timestamp
        var performanceTimestamp = timestamp < 1e12 ? timestamp : timestamp - startTime;

        return callback(performanceTimestamp);
      };

      // Call original rAF with wrapped callback
      rAF(wrapped, element);
    };
  }
})();

export const dom_polyfill = true;
