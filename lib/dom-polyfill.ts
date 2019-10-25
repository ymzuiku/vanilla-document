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

// 扩展 append 和 appendChild
// const append = Element.prototype.append;
// Element.prototype.append = function(...args: any[]) {
//   append.call(this, ...args);
//   args.forEach(v => {
//     if (v && v.__onAppend) {
//       v.__onAppend.call(v, v);
//     }

//     if (v && v.__onRendered) {
//       let timeout = 0;
//       const findAndRunOnAppend = () => {
//         timeout++;
//         const nodeInDOM = document.getElementById(v.__onRenderedId);
//         if (nodeInDOM) {
//           v.__onRendered.call(v, v);
//         } else if (timeout < 100) {
//           setTimeout(findAndRunOnAppend, 40);
//         }
//       };
//       setTimeout(findAndRunOnAppend, 40);
//     }
//   });
// };

// const appendChild = Element.prototype.appendChild;
// (Element as any).prototype.appendChild = function(v: any) {
//   appendChild.call(this, v);
//   if (v.__onAppend) {
//     v.__onAppend.call(v, v);
//   }

//   if (v.__onRendered) {
//     let timeout = 0;
//     const findAndRunOnAppend = () => {
//       timeout++;
//       const nodeInDOM = document.getElementById(v.__onRenderedId);
//       if (nodeInDOM) {
//         v.__onRendered.call(v, v);
//       } else if (timeout < 100) {
//         setTimeout(findAndRunOnAppend, 40);
//       }
//     };
//     setTimeout(findAndRunOnAppend, 40);
//   }
// };
