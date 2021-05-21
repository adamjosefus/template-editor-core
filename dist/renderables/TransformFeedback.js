import {Vector, Utils, Transform, Fill, Stroke, Shadow} from "../web-modules/pkg/@templatone/kreslo.js";
export class TransformFeedback {
  constructor(width, height) {
    this._width = 0;
    this._height = 0;
    this._distance = 100;
    this._margin = 8;
    this._clipArea = {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    };
    this._gridItems = [];
    this._pivot = new Transform();
    this._grid = new Transform();
    this.resize(width, height);
  }
  get position() {
    return this._pivot.position;
  }
  set position(v) {
    this._pivot.position = v;
  }
  get scale() {
    return this._pivot.scale;
  }
  set scale(v) {
    this._pivot.scale = v;
  }
  get rotation() {
    return this._pivot.rotation;
  }
  set rotation(v) {
    this._pivot.rotation = v;
  }
  static _createGridItems(parent, width, height, distance) {
    const diameter = (() => {
      const diagonal = (width ** 2 + height ** 2) ** 0.5;
      const count = Math.floor(diagonal / distance);
      return (count % 2 == 0 ? count : count + 1) * distance;
    })();
    const radius = diameter / 2;
    const items = [];
    for (let x = -radius; x <= radius; x += distance) {
      for (let y = -radius; y <= radius; y += distance) {
        const t = new Transform();
        t.position.set(x, y);
        t.setParent(parent);
        items.push(t);
      }
    }
    return items;
  }
  _clearStyles(renderingLayer) {
    Shadow.clear(renderingLayer);
    Fill.clear(renderingLayer);
    Stroke.clear(renderingLayer);
  }
  _computeCenterOfGrid(position) {
    if (this._width <= 0 || this._height <= 0)
      return Vector.Zero;
    const attractantPoint = new Vector(this._width / 2, this._height / 2);
    const stepForward = new Vector(-this._distance, 0);
    stepForward.rotate(this._pivot.rotation.degrees);
    const stepRight = new Vector(this._distance, 0);
    stepRight.rotate(this._pivot.rotation.degrees);
    const stepUp = new Vector(0, -this._distance);
    stepUp.rotate(this._pivot.rotation.degrees);
    const stepDown = new Vector(0, this._distance);
    stepDown.rotate(this._pivot.rotation.degrees);
    const steps = [stepForward, stepRight, stepUp, stepDown];
    const find = (value) => {
      const variants = steps.map((step) => {
        const position2 = value.clone().add(step);
        const delta = position2.clone().subtract(attractantPoint);
        return {
          position: position2,
          delta
        };
      });
      variants.sort((a, b) => a.delta.length - b.delta.length);
      const shortest = variants[0];
      if (shortest.delta.length <= this._distance)
        return shortest.position;
      return find(shortest.position);
    };
    return find(position);
  }
  _renderDot(renderingLayer, x, y, clipArea, distance, margin) {
    const ctx = renderingLayer.getRenderingContext();
    const defaultDotSize = 6;
    const transitionSize = defaultDotSize;
    if (!(x > clipArea.left && x < clipArea.left + clipArea.width && y > clipArea.top && y < clipArea.top + clipArea.height))
      return;
    let xRatio = 1;
    let yRatio = 1;
    if (x < clipArea.left + transitionSize) {
      xRatio = (x - clipArea.left) / transitionSize;
    } else if (x > clipArea.left + clipArea.width - transitionSize) {
      xRatio = (clipArea.left + clipArea.width - x) / transitionSize;
    }
    if (y < clipArea.top + transitionSize) {
      yRatio = (y - clipArea.top) / transitionSize;
    } else if (y > clipArea.top + clipArea.height - transitionSize) {
      yRatio = (clipArea.top + clipArea.height - y) / transitionSize;
    }
    const ratio = xRatio * yRatio;
    const dotSize = defaultDotSize * Utils.BezierEasing.linear(ratio);
    const centerX = this._width / 2;
    const centerY = this._height / 2;
    if (x < centerX) {
      x += defaultDotSize / 2 * (1 - xRatio);
    } else {
      x -= defaultDotSize / 2 * (1 - xRatio);
    }
    if (y < centerY) {
      y += defaultDotSize / 2 * (1 - yRatio);
    } else {
      y -= defaultDotSize / 2 * (1 - yRatio);
    }
    ctx.beginPath();
    ctx.ellipse(x, y, dotSize / 2, dotSize / 2, 0, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.strokeStyle = "rgba(0, 0, 0, .1)";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.fill();
  }
  _renderPivot(renderingLayer, x, y) {
    const ctx = renderingLayer.getRenderingContext();
    const dotSize = 16;
    const limit = dotSize / 2 + this._margin;
    if (x < 0 + limit) {
      x = limit;
    } else if (x > this._width - limit) {
      x = this._width - limit;
    }
    if (y < 0 + limit) {
      y = limit;
    } else if (y > this._height - limit) {
      y = this._height - limit;
    }
    const radius = dotSize / 2 - 1;
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.strokeStyle = "rgba(0, 0, 0, .1)";
    ctx.lineWidth = 3 + 2 * 2;
    ctx.stroke();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  _renderDotGrid(renderingLayer) {
    const pos = this._computeCenterOfGrid(this._pivot.position.clone());
    const rot = this._pivot.rotation.clone();
    this._grid.position = pos;
    this._grid.rotation = rot;
    this._gridItems.forEach((transform) => {
      const pos2 = transform.getComputed().position;
      this._renderDot(renderingLayer, pos2.x, pos2.y, this._clipArea, this._distance, this._margin);
    });
    this._renderPivot(renderingLayer, this.position.x, this.position.y);
  }
  resize(width, height) {
    this._width = width;
    this._height = height;
    this._clipArea = {
      left: this._margin,
      top: this._margin,
      width: this._width - this._margin * 2,
      height: this._height - this._margin * 2
    };
    this._gridItems = TransformFeedback._createGridItems(this._grid, this._width, this._height, this._distance);
  }
  render(renderingLayer) {
    this._clearStyles(renderingLayer);
    this._renderDotGrid(renderingLayer);
  }
}
