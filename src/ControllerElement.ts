import { LitElement } from 'lit';
import { ControllerEvent } from './ControllerEvent.js';
import { SceneEvent } from './SceneEvent.js';
import { EditorEvent } from './EditorEvent.js';
import type { IData } from "./IData.js";


export abstract class ControllerElement<D extends IData> extends LitElement {

    protected _data: D;

    constructor(defaultData: D) {
        super();

        // Data
        this._data = defaultData;
    }


    connectedCallback() {
        super.connectedCallback();

        window.addEventListener('scene-ready', (e: SceneEvent<D>) => {
            e.stopPropagation();

            this._isSceneReady = true;

            if (this._isControllerReady && this._isSceneReady) {
                this._fireDataUpdateEvent();
            }
        }, { once: true });


        window.addEventListener('editor-snapshot-data-request', (e: EditorEvent<D>) => {
            e.stopPropagation();
            this._onSnapshotDataRequest(e);
        });


        window.addEventListener('editor-snapshot-data', (e: EditorEvent<D>) => {
            e.stopPropagation();
            this._onSnapshotData(e);
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
        const event = new ControllerEvent('controller-ready', data, this.isDataValid(data));

        this._fireEvent(event);
    }


    protected _fireDataUpdateEvent() {
        const data = this.getData();
        const event = new ControllerEvent('controller-update', data, this.isDataValid(data));

        this._fireEvent(event);
    }


    protected _fireSnapshotDataEvent() {
        const data = this.getData();
        const event = new ControllerEvent('controller-snapshot', data, this.isDataValid(data));

        this._fireEvent(event);
    }
}