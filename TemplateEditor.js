import { html } from "../../node_modules/lit-html/lit-html.js";
import { CustomElement } from "../CustomElement.js";
import { TemplateEditorEvent as EditorEvent, TemplateControllerEvent as ControllerEvent, } from "./index.js";
import { UIButton } from "../ui/ui-button.js";
import { UIIcon } from "../ui/ui-icon.js";
import { TemplateStage } from "./TemplateStage.js";
const style = html `
<style>
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
</style>
`;
export class TemplateEditor extends CustomElement {
    constructor() {
        super();
        this._controllerValid = false;
        // Init
        window.addEventListener(ControllerEvent.DATA_UPDATE, (e) => {
            const event = e;
            this._onControllerDataUpdate(event);
        });
        this.init();
    }
    get controllerValid() { return this._controllerValid; }
    set controllerValid(value) {
        this._controllerValid = value;
        this.invalidate();
    }
    init() {
    }
    _onControllerDataUpdate(e) {
        this.controllerValid = e.detail.valid;
    }
    fireExportRequest() {
        const event = new EditorEvent(EditorEvent.EXPORT_REQUEST);
        window.dispatchEvent(event);
    }
    getTemplate() {
        UIButton;
        UIIcon;
        TemplateStage;
        return html `
            ${style}

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
                            <ui-button .disabled=${this.controllerValid === false || this.controllerValid === undefined} @click="${() => this.fireExportRequest()}">
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
TemplateEditor.registerCustomElement('template-editor');
