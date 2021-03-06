/**
 * 圆形
 * @module zrender/shape/Circle
 */

import Path from "../Path";

export default Path.extend({
  type: "circle",

  shape: {
    cx: 0,
    cy: 0,
    r: 0
  },

  buildPath: function(ctx, shape, inBundle) {
    // Better stroking in ShapeBundle
    // Always do it may have performence issue ( fill may be 2x more cost)
    if (inBundle) {
      ctx.moveTo(shape.cx + shape.r, shape.cy);
    }
    ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2, true);
  }
});
