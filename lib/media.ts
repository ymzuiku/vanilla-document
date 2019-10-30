const ua = navigator.userAgent;
const isAndroid = /(?:Android)/.test(ua);
const isIos = /(?:iPhone)/.test(ua);
const isWechat = /MicroMessenger/.test(ua);
const isPc = !isIos && !isAndroid;

export const media = {
  '@media-sm': `@media (min-width: 640px)`,
  '@media-md': '@media (min-width: 768px)',
  '@media-lg': '@media (min-width: 1024px)',
  '@media-xl': '@media (min-width: 1280px)',
  '@media-pc': `@media (min-width: ${isPc ? '0px' : '9999px'})`,
  '@media-ios': `@media (min-width: ${isIos ? '0px' : '9999px'})`,
  '@media-android': `@media (min-width: ${isAndroid ? '0px' : '9999px'})`,
  '@media-wechat': `@media (min-width: ${isWechat ? '0px' : '9999px'})`,
};
