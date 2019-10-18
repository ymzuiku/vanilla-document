const ua = navigator.userAgent;
const dp = window.devicePixelRatio || 1;
const iw = () => window.screen.width;
const ih = () => window.screen.height;

export const isAndroid = /(?:Android)/.test(ua);
// const isAndroid = true;
export const isFireFox = /(?:Firefox)/.test(ua);
export const isChrome = /(?:Chrome|CriOS)/.test(ua);
export const isPad =
  /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));
export const isIos = /(?:iPhone)/.test(ua) && !isPad;
export const isWechat = /MicroMessenger/.test(ua);
export const isPc = !isIos && !isAndroid;
