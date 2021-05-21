import { Engine } from "./node_modules/@templatone/kreslo/kreslo.js";
import { html, TemplateResult } from "./node_modules/lit-html/lit-html.js";
import { CustomElement } from "./node_modules/@templatone/components/components.js";

import {
    ITemplateData as IData,
    ITemplateConfig as IConfig,
    TemplateEditorEvent as EditorEvent,
    TemplateControllerEvent as ControllerEvent,
    TemplateSceneEvent as SceneEvent,
} from "./index.js";
import { TransformFeedback } from "./renderables/TransformFeedback.js";


export class TemplateStage extends CustomElement {

    private _canvas: HTMLCanvasElement;
    private _container: HTMLElement;
    private _engine: Engine;

    private _lastStageWidth: number = 0;
    private _lastStageHeight: number = 0;

    private _transformFeedback: TransformFeedback;


    constructor() {
        super();

        const container = this.shadowRoot!.getElementById('container') as HTMLElement;
        const canvas = this.shadowRoot!.querySelector('canvas') as HTMLCanvasElement;
        const engine = new Engine(canvas, 0, 0, undefined, null);

        window.addEventListener('resize', e => this._onClientResize());
        window.addEventListener(SceneEvent.RESIZE, e => this._onStageRezie(e as SceneEvent<unknown>));

        this._container = container;
        this._canvas = canvas;
        this._engine = engine;

        this._engine.loop.addUpdateCallback(() => this._render());
        this._engine.loop.start();
    }


    private _onClientResize() {
        this._updateSize();
    }


    private _onStageRezie(e: SceneEvent<unknown>) {
        console.log("_onStageRezie");

        const event = e as SceneEvent<unknown>;

        const width = event.detail.scene.getWidth();
        const height = event.detail.scene.getHeight();

        this._lastStageWidth = width;
        this._lastStageHeight = height;

        this._updateSize();
    }


    private _updateSize() {
        const width: number = this._lastStageWidth;
        const height: number = this._lastStageHeight;

        const aspectRatio = width / height;

        const clientWidth = this.clientWidth;
        const clientHeight = this.clientWidth / aspectRatio;

        this._container.style.setProperty('--aspect-ratio', `${aspectRatio}`);
        this._container.style.setProperty('--width', `${clientWidth.toFixed(3)}px`);
        this._container.style.setProperty('--height', `${clientHeight.toFixed(3)}px`);

        this._engine.updateSize(clientWidth, clientHeight, 1, null);
        this._transformFeedback.resize(clientWidth, clientHeight);
    }


    private _render() {
        this._engine.clear();
        this._transformFeedback.render(this._engine);
    }


    getTemplate(): TemplateResult {
        return html`
            <style>
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
            </style>


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
}


TemplateStage.registerCustomElement('template-stage');