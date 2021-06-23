var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {html, css, LitElement} from "./web-modules/pkg/lit.js";
import {customElement, query} from "./web-modules/pkg/lit/decorators.js";
import {Engine} from "./web-modules/pkg/@templatone/kreslo.js";
export let StageElement = class extends LitElement {
  constructor() {
    super();
    this._lastStageWidth = 0;
    this._lastStageHeight = 0;
    const container = this.shadowRoot.getElementById("container");
    const canvas = this.shadowRoot.querySelector("canvas");
    const engine = new Engine(canvas, 0, 0, void 0, null);
    window.addEventListener("resize", (e) => this._onClientResize());
    window.addEventListener("scene-resize", (e) => this._onStageRezie(e));
    this._container = container;
    this._canvas = canvas;
    this._engine = engine;
    this._engine.loop.addUpdateCallback(() => this._render());
    this._engine.loop.start();
  }
  _onClientResize() {
    this._updateSize();
  }
  _onStageRezie(e) {
    e.stopPropagation();
    const width = e.detail.scene.getWidth();
    const height = e.detail.scene.getHeight();
    this._lastStageWidth = width;
    this._lastStageHeight = height;
    this._updateSize();
  }
  _updateSize() {
    const width = this._lastStageWidth;
    const height = this._lastStageHeight;
    const aspectRatio = width / height;
    const clientWidth = this.clientWidth;
    const clientHeight = this.clientWidth / aspectRatio;
    this._container.style.setProperty("--aspect-ratio", `${aspectRatio}`);
    this._container.style.setProperty("--width", `${clientWidth.toFixed(3)}px`);
    this._container.style.setProperty("--height", `${clientHeight.toFixed(3)}px`);
    this._engine.updateSize(clientWidth, clientHeight, 1, null);
  }
  _render() {
    this._engine.clear();
  }
  render() {
    return html`
            <div id="container" class="container">
                <div class="overlay">
                    <canvas></canvas>
                </div>
            
                <div class="scene">
                    <slot name="scene"></slot>
                </div>
            </div>
        `;
  }
};
StageElement.styles = css`
        .container {
            display: block;
            width: 100%;
            height: 0;
            padding-bottom: calc((1 / var(--aspect-ratio)) * 100%);
        }

        .overlay {
            position: absolute;
            z-index: 1;
            width: var(--width);
            height: var(--height);
            border-radius: 4px;
            overflow: hidden;
        }

        .scene {
            position: absolute;
            z-index: 0;
            width: var(--width);
            height: var(--height);
            border-radius: 4px;
            overflow: hidden;
        }

        canvas {
            display: block;
            width: 100%;
        }

        ::slotted([slot=scene]) {
            display: block;
            width: 100%;
        }
    `;
__decorate([
  query("#container")
], StageElement.prototype, "_container", 2);
__decorate([
  query("canvas")
], StageElement.prototype, "_canvas", 2);
StageElement = __decorate([
  customElement("template-stage")
], StageElement);
