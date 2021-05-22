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
import {customElement, html, css, LitElement, property} from "./web-modules/pkg/lit-element.js";
import {
  TemplateEditorEvent as EditorEvent,
  TemplateControllerEvent as ControllerEvent
} from "./main.js";
customElement("template-editor");
export class TemplateEditor extends LitElement {
  constructor() {
    super(...arguments);
    this.controllerValid = false;
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(ControllerEvent.DATA_UPDATE, (e) => {
      const event = e;
      this._onControllerDataUpdate(event);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  _onControllerDataUpdate(e) {
    this.controllerValid = e.detail.valid;
  }
  fireExportRequest() {
    const event = new EditorEvent(EditorEvent.EXPORT_REQUEST);
    window.dispatchEvent(event);
  }
  render() {
    return html`
            <li>Controller: ${this.controllerValid ? "Valid" : "Invalid"}</li>

            <div class="layout">
                <div class="controller">
                    <slot name="controller"></slot>
                </div>

                <div class="scene" appearance="darkmode">
                    <div class="scene-content">
                        <template-stage>
                            <slot slot="scene" name="scene"></slot>
                        </template-stage>

                        <div class="scene-toolbar">
                            <ui-button .disabled=${this.controllerValid === false || this.controllerValid === void 0} @click="${() => this.fireExportRequest()}">
                                <ui-icon slot="icon" glyph="image"></ui-icon>
                                <span>Exportovat</span>
                            </ui-button>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
}
TemplateEditor.style = css`
        :host {
            display: block;
        }

        .layout {
            box-sizing: border-box;
            display: grid;
            grid-template-areas:
                'controller scene';
            grid-template-columns: 300px auto;
            grid-template-rows: min-content auto;
            padding: 6px;

        }

        .controller {
            grid-area: controller;
            display: block;
            box-sizing: border-box;
            padding: 10px;
        }

        .scene {
            grid-area: scene;
            display: block;
            box-sizing: border-box;
            padding: 10px;
        }

        .scene-content {
            width: 100%;
            position: sticky;
            top: 16px;
            display: block;
            box-sizing: border-box;
            padding: 10px;
            border-radius: 16px;
        }

        .scene-toolbar {
            margin-top: 16px;
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        template-stage {
            display: block;
            width: 100%;
            overflow: hidden;
        }
    `;
__decorate([
  property({type: Boolean})
], TemplateEditor.prototype, "controllerValid", 2);
