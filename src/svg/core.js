var svgURI = "http://www.w3.org/2000/svg";

// 在特定命名空间中创建SVG元素，之所以需要携带命名空间。是因为不同版本的SVG具有不同的特性，因此浏览器根据版本来确定SVG的语法合法性
export function createElement(name) {
  return document.createElementNS(svgURI, name);
}
