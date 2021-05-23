import { LitElement } from 'lit';
export declare class TemplateStage extends LitElement {
    private _container;
    private _canvas;
    private _engine;
    private _lastStageWidth;
    private _lastStageHeight;
    constructor();
    private _onClientResize;
    private _onStageRezie;
    private _updateSize;
    private _render;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResultGroup;
}
