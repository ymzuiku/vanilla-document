!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).vanilly={})}(this,function(e){"use strict";void 0===window.history&&(window.history={}),void 0===window.history.pushState&&(window.history.pushState=function(){window.history.length+=1}),void 0===window.history.replaceState&&(window.history.replaceState=function(){}),void 0===window.history.back&&(window.history.back=function(){window.history.length-=1}),void 0===window.history.forward&&(window.history.forward=function(){}),void 0===window.history.go&&(window.history.go=function(){}),void 0===window.history.length&&(window.history.length=0),void 0===window.history.state&&(window.history.state={}),void 0===window.history.scrollRestoration&&(window.history.scrollRestoration=function(){}),[Element.prototype,CharacterData.prototype,DocumentType.prototype].forEach(function(e){e.hasOwnProperty("remove")||Object.defineProperty(e,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode.removeChild(this)}})}),[Element.prototype,CharacterData.prototype,DocumentType.prototype].forEach(function(e){e.hasOwnProperty("append")||Object.defineProperty(e,"append",{configurable:!0,enumerable:!0,writable:!0,value:function(){for(var t=this,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];e.forEach(function(e){t.appendChild(e)})}})}),function(){if(!!(!window.performance||!window.performance.now)){var n=window.requestAnimationFrame,o=+new Date;window.requestAnimationFrame=function(t,e){n(function(e){return t(e<1e12?e:e-o)},e)}}}();var n="vanilly-onupdate",t="vanilly-onappend",r="vanilly-onmount",a="vanilly-onremove",v=function(){return(v=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function s(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(e){return null}}function w(e,t){if(!e)return null;for(var n,o=/([^=?&]+)=?([^&]*)/g,i={};n=o.exec(e);){var r=s(n[1]),a=s(n[2]);null===r||null===a||r in i||(t||(a=isNaN(Number(a))?a:Number(a)),i[r]=a)}return i}function y(e,t){void 0===t&&(t="");var n,o,i=[];for(o in"string"!=typeof t&&(t="?"),e)if(Object.prototype.hasOwnProperty.call(e,o)){if((n=e[o])||null!=n&&!isNaN(n)||(n=""),o=encodeURIComponent(o),n=encodeURIComponent(n),null===o||null===n)continue;i.push(o+"="+n)}return i.length?t+i.join("&"):""}function o(s){function u(e,t){var n=e+t;if(c.has(n))return c.get(n);var o=e&&e.split("/"),i=t&&t.split("/");if(!i||!o)return c.set(n,!1),!1;var r=!0;return o.forEach(function(e,t){"*"!==e&&e!==i[t]&&(r=!1)}),c.set(n,r),r}function a(){if(0<window.location.hash.length){var e=window.location.hash.split("?"),t=e[0],n=e[1],o=void 0===n?"":n;return[t.replace(h,""),o]}return[window.location.pathname,window.location.search||""]}function l(e,t){for(var n=0,o=i;n<o.length;n++){(0,o[n])(e,t,s.getState())}}function d(o,i,r){o!==s.getState().paths[s.getState().paths.length-1]&&(s.update(function(e){e.paths.push(o);var t=v({},e.history[o],i);if(e.history[o]=t,"undefined"!=typeof window&&!r&&!p){var n=y(t);window.history.pushState(null,""+h+o,""===n?""+h+o:""+h+o+"?"+n)}}),l(o,i))}function r(e,n){var t=s.getState(),o="number"==typeof e?e:t.paths.length-1,i=t.paths[o-1],r=t.history[i];s.update(function(e){for(var t=0;t<e.paths.length-o;t++)n||window.history.back(),e.history[i]={},e.paths.pop()}),l(i,r)}var c=new Map,f=new Map,h="",p=!1,i=[];if("undefined"!=typeof window){window.addEventListener("popstate",function(){var e=s.getState().paths;if(a()[0]!==e[e.length-1]){var n=!1;if(e.forEach(function(e,t){e===a()[0]&&(n=!0)}),n)r(void 0,!0);else{var t=a(),o=t[0],i=t[1];d(o,""!==i?w(i):void 0,!0)}}else l(a()[0],void 0)})}return{checkPathMatch:function(e){var t=s.getState().paths,n=e+":"+t.join(",");if(f.has(n))return f.get(n);for(var o=!1,i=0,r=0;r<t.length;r++){u(e,t[r])&&(i=r,o=!0)}var a=[u(e,t[t.length-1]),o,i];return f.set(n,a),a},init:function(e,t,n){if(void 0===n&&(n="#"),p=t||!1,h=n,s.update(function(e){e.paths=[],e.history=v({},e.history)}),"undefined"!=typeof window){var o=a(),i=o[0],r=w(o[1]);"/"===i||i===e?d(e,r):(d(e),d(i,r))}},listen:function(e){i.push(e)},pop:r,push:d,replace:function(o,i){var e=s.getState(),r=o||e.paths[e.paths.length-1];s.update(function(e){var t=v({},e.history[o],i);if(e.history[o]=t,e.paths[e.paths.length-1]=r,"undefined"!=typeof window){var n=y(t);window.history.replaceState(null,""+h+r,""===n?""+h+r:""+h+r+"?"+n)}}),l(r,i)}}}var p="block",_="block",m="absolute",g="auto",b="none";var C,u={__listenFns:new Set,__listenNodes:new Set,__state:{},mutationObserver:function(e){return e},middleware:{update:[],getState:[]},getState:function(){return 0<u.middleware.getState.length&&u.middleware.getState.forEach(function(e){u.__state=e(u.__state)}),u.__state},update:function(e){0<u.middleware.update.length&&u.middleware.update.forEach(function(e){u.__state=e(u.__state)});var t=e(u.__state);t&&(u.__state=t),u.__listenFns.forEach(function(e){var t=e(u.__state);t&&(u.__state=t)}),u.__listenNodes.forEach(function(e){if(e&&e.__onMemo&&e.__onUpdate){var t=e.__onMemo(u.__state);e.__lastMemo!==t&&(e.__onUpdate(t||[],e),e.__lastMemo=t)}})},listen:function(e){u.__listenFns.has(e)||u.__listenFns.add(e)}},i={routeManage:C=o(u),Route:function(e){var a=e.path,s=e.component,u=e.delay,t=e.keep,l=void 0===t||t,d=e.leaveTime,c=M("div");c.setAttribute("route",a),c.setStyle({width:"100%",height:"100%",overflow:"hidden",left:"0px",top:"0px",backgroundColor:"#fff",pointerEvents:b,display:_,position:m,zIndex:1});var f={animeTimer:null,unListen:null,isRenderChild:!1,style:{},realChild:null},h=function(){var e=C.checkPathMatch(a),t=e[0],n=e[1],o=e[2];if(t)f.realChild||(void 0===u?(f.realChild=s(),c.innerHTML("").append(f.realChild),h()):s().then(function(e){f.realChild=e(),c.innerHTML("").append(f.realChild),h()})),f.isRenderChild=!0,f.style={pointerEvents:g,display:p,position:"relative",zIndex:3},c.setStyle(f.style);else{var i=l&&n,r=f.isRenderChild;void 0!==f.isRenderChild&&!0!==f.isRenderChild||(0<o&&d&&0<d?(f.style={pointerEvents:g,display:p,position:m,zIndex:p},c.setStyle(f.style),setTimeout(function(){f.isRenderChild=i,f.style={pointerEvents:b,display:_,position:m,zIndex:1},c.setStyle(f.style),r&&!f.isRenderChild?c.innerHTML(""):r||c.innerHTML("").append(f.realChild)},d)):(f.isRenderChild=i,f.style={pointerEvents:b,display:_,position:m,zIndex:0<o?2:1},c.setStyle(f.style),r&&!f.isRenderChild?c.innerHTML(""):r||c.innerHTML("").append(f.realChild)))}};return c.onAppend(function(){f.unListen=C.listen(h)}),c.onRemove(function(){f.unListen&&f.unListen(),f.realChild=null,f.animeTimer=null}),c}},l=i.Route,d=i.routeManage;function c(i){var o={__isChain:!0,target:i,ref:function(e){return e(o),o},addEventListener:function(e,t,n){return i.addEventListener(e,t,n),o},removeEventListener:function(e,t,n){return i.removeEventListener(e,t,n),o},innerText:function(e){return i.innerText=e,o},innerHTML:function(e){return i.innerHTML=e,o},textContent:function(e){return i.textContent=e,o},children:function(e){for(var t=[],n=0;n<i.children.length;n++)t.push(i.children.item(n));return e(t),o},clearChildren:function(){for(var e=0;e<i.children.length;e++){c(i.children.item(e)).remove()}return o},removeChild:function(e){for(var t=0;t<i.children.length;t++){var n=i.children.item(t);e(n,t)&&c(n).remove()}return o},remove:function(){return o.clearChildren(),i.__onRemove&&(i.__onRemove(i.__lastMemo,i),u.__listenNodes.delete(i)),i.remove(),o},append:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return e.forEach(function(e){if(e){var t=e.__isChain?e.target:e;if(t.__onUpdate&&(u.__listenNodes.has(t)||u.__listenNodes.add(t)),i.appendChild(t),t.__onAppend&&t.__onAppend(t.__lastMemo,t),t.__onMount){t.id||(t.id=Math.random().toString(16).slice(2));var n=0,o=function(){n++,document.getElementById(t.id)?t.__onMount(t.__lastMemo,t):n<200&&requestAnimationFrame(o)};requestAnimationFrame(o)}}}),o},setProps:function(t){return Object.keys(t).forEach(function(e){i[e]=t[e]}),o},setAttribute:function(e,t){return i.setAttribute(e,t),o},removeAttribute:function(e){return i.removeAttribute(e),o},cssText:function(e){return i.style.cssText=e,o},setClass:function(e){return i.setAttribute("class",e),o},updateClass:function(e){var t=e(i.className||"");return i.setAttribute("class",t),o},setStyle:function(t){return Object.keys(t).forEach(function(e){i.style[e]=t[e]}),o},onUpdate:function(e,t){return i.__onMemo=e,i.__onUpdate=t,i.setAttribute(n,"1"),o},onAppend:function(e){return i.__onAppend=e,i.setAttribute(t,"1"),o},onMount:function(e){return i.__onMount=e,i.setAttribute(r,"1"),o},onRemove:function(e){return i.__onRemove=e,i.setAttribute(a,"1"),o}};return o}var M=function(e,t){return c("string"!=typeof e?e:document.createElement(e,t))};e.DOM=M,e.Route=l,e.routeManage=d,e.store=u,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
