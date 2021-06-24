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
import {customElement} from "./web-modules/pkg/lit/decorators.js";
export let StageElement = class extends LitElement {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  render() {
    return html`
            <div class="container">
                <div class="scene">
                    <slot name="scene"></slot>
                </div>
            </div>
        `;
  }
};
StageElement.styles = css`
        :host {
            display: block;
            width: 100%;
        }

        ::slotted([slot=scene]) {
            display: block;
            width: 100%;
        }
    `;
StageElement = __decorate([
  customElement("template-stage")
], StageElement);
