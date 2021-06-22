import { html, css, LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js'
import { ControllerEvent } from './ControllerEvent.js';
import { SceneEvent } from './SceneEvent.js';
import type { IData } from "./IData.js";
import { EditorEvent } from './EditorEvent.js';


export abstract class ControllerElement<D extends IData> extends LitElement {

    protected _data: D;

    constructor(defaultData: D) {
        super();

        // Data
        this._data = defaultData;
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
        throw new Error(`${this.tagName}: method "startup" is not defined.`);
    }


    getData(): D {
        return this._data;
    }


    setData(data: D): void {
        if (this.isStructureValid(data)) {
            this._data = data;
            this._fireDataUpdateEvent();
            
            this.reflectDataToControls(data);
        } else {
            throw new Error("Data structure is not valid.");
        }
    }


    reflectDataToControls(data: D): void {
        throw new Error(`${this.tagName}: method "reflectDataToControls" is not defined.`);
    }


    isDataValid(data: D): boolean {
        throw new Error(`${this.tagName}: method "isValid" is not defined.`);
    }


    isStructureValid(data: D): boolean {
        throw new Error(`${this.tagName}: method "isStructureValid" is not defined.`);
    }


    private _onSnapshotDataRequest(e: EditorEvent<D>) {
        this._fireSnapshotDataEvent();
    }


    private _onSnapshotData(e: EditorEvent<D>) {
        if (e.detail.data !== null) {
            this.setData(e.detail.data);
        }
    }


    // Events
    private _fireEvent(event: ControllerEvent<D>): void {
        this.dispatchEvent(event);
        window.dispatchEvent(event);
    }


    protected _fireReadyEvent() {
        const data = this.getData();
        const event = new ControllerEvent(ControllerEvent.Ready, data, this.isDataValid(data));

        this._fireEvent(event);
    }


    protected _fireDataUpdateEvent() {
        const data = this.getData();
        const event = new ControllerEvent(ControllerEvent.DataUpdate, data, this.isDataValid(data));

        this._fireEvent(event);
    }


    protected _fireSnapshotDataEvent() {
        const data = this.getData();
        const event = new ControllerEvent(ControllerEvent.SnapshotData, data, this.isDataValid(data));

        this._fireEvent(event);
    }
}