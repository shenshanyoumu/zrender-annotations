/**
 * zrender: 生成唯一id
 *
 * @author errorrik (errorrik@gmail.com)
 */

//  怪异的开始计数值
var idStart = 0x0907;

export default function() {
  return idStart++;
}
