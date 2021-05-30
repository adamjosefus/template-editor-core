import { LitElement } from 'lit';
export declare class EditorElement extends LitElement {
    controllerValid: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _onControllerDataUpdate;
    fireExportRequest(): void;
    render(): import("lit-html").TemplateResult<1>;
    static style: import("lit").CSSResultGroup;
}
