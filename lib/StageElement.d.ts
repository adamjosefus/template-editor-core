import { LitElement } from 'lit';
import type { IData } from './IData.js';
export declare class StageElement<D extends IData> extends LitElement {
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResultGroup;
}
