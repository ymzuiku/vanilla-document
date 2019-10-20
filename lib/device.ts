const ua = navigator.userAgent;
const dp = window.devicePixelRatio || 1;
const iw = window.innerWidth;

export const isAndroid = /(?:Android)/.test(ua);
// const isAndroid = true;
export const isFireFox = /(?:Firefox)/.test(ua);
export const isChrome = /(?:Chrome|CriOS)/.test(ua);
export const isPad =
  /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));
export const isIos = /(?:iPhone)/.test(ua) && !isPad;
export const isWechat = /MicroMessenger/.test(ua);
export const isPc = dp === 1 && iw > 512;
export const isSmall = dp > 1 ? iw <= 320 : iw <= 640;
export const isMiddle = dp > 1 ? iw <= 375 : iw <= 750;
export const isLarge = dp > 1 ? iw <= 512 : iw <= 1024;
export const isExtraLarge = dp > 1 ? iw <= 640 : iw <= 1280;
