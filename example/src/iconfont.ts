import dom from 'vanilla-document';

dom.css(`
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_1466973_yerr5id314.eot?t=1571902477199'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1466973_yerr5id314.eot?t=1571902477199#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtAAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqBNIEtATYCJAMMCwgABCAFhG0HORv2BcgusG14kxJ1uQKKPTaqIgCEp3j4b7/f7zMz96LS1BNRdHWSaqIEXiRBpgV+Sbr69xD1vv3aILYZqfOOeh4vYZa0ns7u9/0O3rSLWaO0y+BdIwnI/J9aan7V8DBxOf0J9CBr6N87/W7Q2NOfugDjgALcC6PICiX2FtlF/E5a8mMCrYZFVez2DI1CvQKtCsSDKvJQX8ooilVvFuqWg0W8qDSnpxTwLL8fv6SjnqTK0Ma9++4StH31dZj955QDsgT1eIWMRaAQ562VQ1XCwqq0Oqv722tFSEvl/49UQnd90D9eImqotx3MqtXEV6Ah4clUdbYEMgjkCcvABtq/OcQk8/j6+enl5lYTlVY5/+rsokXQGv9mZ7uZiw3zuqfYOMMaH9AFLN5/aXh73Vo5P49o2ubW9pbSptZ6frGSirfXHyO6evVDNqdLn69vwWY8buo8nv+4U9tzNYqQA/jfyGcdgCI/CgS/t8pP2av/9W0FfH4KSM//BixG89miwd9TgUMl1JE3F1+hShzLJgHlhNYw7j+U6PU53T0AHiQ0G5gQazKUJ7LmhayiootMpc0KU2u2wbRa0Hu8TR9XlSgtmLegMKHbA5N0esdk3cpgQT+YyqA/ptYdVUyr/ei7sM10qGzHpbxPJSxMoVqUFid+nyX9wyQCI+8WdYmPk+upeUzFk9V6L1nkLrHFC0Xa9zlyV5rYozxHhiHRdqVGRT+u+L6dSSR425viRWkCs8NF8nykBBVMQaoiycL5eB+rfX4YEQKGPLfHNpCOIy6POj1KiUsCwF6nBbI9yiuekJDm83GIc0km1KPMIwaDhOz2eRpS5ItTJpRsGQk8ikOd8e3d5v+dgFbo5hwpchTVjSE9qnuQ+ZJqCQAAAAA=') format('woff2'),
  url('//at.alicdn.com/t/font_1466973_yerr5id314.woff?t=1571902477199') format('woff'),
  url('//at.alicdn.com/t/font_1466973_yerr5id314.ttf?t=1571902477199') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1466973_yerr5id314.svg?t=1571902477199#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-close:before {
  content: "\\e600";
}

.icon-loading:before {
  content: "\\e9a0";
}

`);
