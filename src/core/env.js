/**
 * echarts设备环境识别
 *
 * @desc echarts基于Canvas，纯Javascript图表库，提供直观，生动，可交互，可个性化定制的数据统计图表。
 * @author firede[firede@firede.us]
 * @desc thanks zepto.
 */

var env = {};

// 新增的微信环境检测
if (typeof wx === "object" && typeof wx.getSystemInfoSync === "function") {
  // In Weixin Application
  env = {
    browser: {},
    os: {},
    node: false,
    wxa: true, // Weixin Application
    canvasSupported: true,
    svgSupported: false,
    touchEventsSupported: true,
    domSupported: false
  };
} else if (typeof document === "undefined" && typeof self !== "undefined") {
  // 在web worker环境
  env = {
    browser: {},
    os: {},
    node: false,
    worker: true,
    canvasSupported: true,
    domSupported: false
  };
} else if (typeof navigator === "undefined") {
  //在Node环境
  env = {
    browser: {},
    os: {},
    node: true,
    worker: false,
    canvasSupported: true,
    svgSupported: true,
    domSupported: false
  };
} else {
  env = detect(navigator.userAgent);
}

export default env;

/**
 * 基于Zepto.js库
 * @param {*} ua 客户端代理对象，比如浏览器
 */
function detect(ua) {
  var os = {};
  var browser = {};

  var firefox = ua.match(/Firefox\/([\d.]+)/);

  var ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/.+?rv:(([\d.]+))/);
  var edge = ua.match(/Edge\/([\d.]+)/);

  var weChat = /micromessenger/i.test(ua);

  if (firefox) {
    browser.firefox = true;
    browser.version = firefox[1];
  }

  if (ie) {
    browser.ie = true;
    browser.version = ie[1];
  }

  if (edge) {
    browser.edge = true;
    browser.version = edge[1];
  }

  if (weChat) {
    browser.weChat = true;
  }

  return {
    browser: browser,
    os: os,
    node: false,
    // 原生canvas支持，改极端点了

    canvasSupported: !!document.createElement("canvas").getContext,
    svgSupported: typeof SVGRect !== "undefined",

    touchEventsSupported:
      "ontouchstart" in window && !browser.ie && !browser.edge,

    pointerEventsSupported:
      "onpointerdown" in window &&
      (browser.edge || (browser.ie && browser.version >= 11)),
    domSupported: typeof document !== "undefined"
  };
}
