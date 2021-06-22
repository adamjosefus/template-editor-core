import { html, css, LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js'
import { ControllerEvent } from './ControllerEvent.js';
import { SceneEvent } from './SceneEvent.js';
import type { IData } from "./IData.js";
import { EditorEvent } from './EditorEvent.js';


export abstract class ControllerElement<D extends IData> extends LitElement {

    data: D;

    constructor(defaultData: D) {
        super();

        // Data
        this.data = defaultData;
    }


    connectedCallback() {
        super.connectedCallback();

        window.addEventListener(SceneEvent.Ready, (e: Event) => {
            const event = e as SceneEvent<D>;
            this._isSceneReady = true;

            if (this._isControllerReady && this._isSceneReady) {
                this._fireDataUpdateEvent();
            }
        }, { once: true });


        window.addEventListener(EditorEvent.SnapshotDataRequest, (e: Event) => {
            const evnt = e as EditorEvent<D>;
            this._onSnapshotDataRequest(evnt);
        });


        window.addEventListener(EditorEvent.SnapshotData, (e: Event) => {
            const evnt = e as EditorEvent<D>;
            this._onSnapshotData(evnt);
        });

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


    isValid(data: D): boolean {
        throw new Error(`${this.tagName}: method isValid is not defined.`);
    }

    isValidStructure(data: D): boolean {
        throw new Error(`${this.tagName}: method isValidStructure is not defined.`);
    }


    private _onSnapshotDataRequest(e: EditorEvent<D>) {
        this._fireSnapshotDataEvent();
    }


    private _onSnapshotData(e: EditorEvent<D>) {
        if (e.detail.data !== null && this.isValidStructure(e.detail.data)) {     
            this.data = e.detail.data;
            this._fireDataUpdateEvent();
        }
    }

    // Events
    private _fireEvent(event: ControllerEvent<D>): void {
        this.dispatchEvent(event);
        window.dispatchEvent(event);
    }


    protected _fireReadyEvent() {
        const event = new ControllerEvent(ControllerEvent.Ready, this.data, this.isValid(this.data));
        this._fireEvent(event);
    }


    protected _fireDataUpdateEvent() {
        const event = new ControllerEvent(ControllerEvent.DataUpdate, this.data, this.isValid(this.data));
        this._fireEvent(event);
    }


    protected _fireSnapshotDataEvent() {
        const event = new ControllerEvent(ControllerEvent.SnapshotData, this.data, this.isValid(this.data));
        this._fireEvent(event);
    }
}