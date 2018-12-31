import { debugMode } from "../config";

var log = function() {};

// 在生产环境和开发环境处理日志的方式不一样
if (debugMode === 1) {
  log = function() {
    for (var k in arguments) {
      throw new Error(arguments[k]);
    }
  };
} else if (debugMode > 1) {
  log = function() {
    for (var k in arguments) {
      console.log(arguments[k]);
    }
  };
}

export default log;


if (module.hot) {
    module.hot.accept('./library.js', function() {
      // 使用更新过的 library 模块执行某些操作...
    })