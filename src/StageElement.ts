import { html, css, LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js'
import { Engine } from "@templatone/kreslo";
import { SceneEvent } from "./SceneEvent.js";
import type { IData } from './IData.js';


@customElement('template-stage')
export class StageElement<D extends IData> extends LitElement {

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


    static styles = css`
        :host {
            display: block;
            width: 100%;
        }

        ::slotted([slot=scene]) {
            display: block;
            width: 100%;
        }
    `;
}