import {html, css, LitElement} from 'lit';
import {customElement, property, state, query} from 'lit/decorators.js'

import {
    ITemplateData as IData,
    TemplateControllerEvent as ControllerEvent,
    TemplateSceneEvent as SceneEvent
} from "./main.js";


export abstract class TemplateController<DATA extends IData> extends LitElement {

    readonly data: DATA;

    constructor(defaultData: DATA) {
        super();
        
        // Data
        this.data = defaultData;
    }


    connectedCallback() {
        super.connectedCallback();

        window.addEventListener(SceneEvent.READY, (e: Event) => {
            const event = e as SceneEvent<DATA>;
            this._isSceneReady = true;

            if (this._isControllerReady && this._isSceneReady) {
                this.fireDataUpdateEvent();
            }
        }, { once: true });

    }
   
   
    disconnectedCallback() {
        super.disconnectedCallback();

        // TODO: remove listeners
    }


    firstUpdated() {
        this.init();
    }



    private _isSceneReady: boolean = false;
    private _isControllerReady: boolean = false;
    isReady(): boolean {
        return this._isControllerReady;
    }


    async init() {
        await this._startup();
    }


    private async _startup(): Promise<void> {
        await this.startup();

        this._isControllerReady = true;
        this._fireReadyEvent();
    }


    async startup(): Promise<void> {
        throw new Error(`${this.tagName}: method startup is not defined.`);
    }


    isValid(data: DATA): boolean {
        throw new Error(`${this.tagName}: method isValid is not defined.`);
    }


    // Events
    private _fireEvent(event: ControllerEvent<DATA>): void {
        this.dispatchEvent(event);
        window.dispatchEvent(event);
    }


    private _fireReadyEvent() {
        const event = new ControllerEvent(ControllerEvent.READY, this.data, this.isValid(this.data))
        this._fireEvent(event);
    }


    fireDataUpdateEvent() {
        const event = new ControllerEvent(ControllerEvent.DATA_UPDATE, this.data, this.isValid(this.data))
        this._fireEvent(event);
    }
}