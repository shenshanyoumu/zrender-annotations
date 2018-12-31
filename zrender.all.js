export * from "./src/zrender";
export * from "./src/export";

// 对SVG/VML宿主环境的支持，核心思路就是将canvas的API与SVG/VML指令一一映射
import "./src/svg/svg";
import "./src/vml/vml";
