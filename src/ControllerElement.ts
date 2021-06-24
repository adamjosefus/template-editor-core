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


        window.addEventListener('editor-saving-snapshot', (e: EditorEvent<D>) => {
            e.stopPropagation();
            this._onSavingSnapshot(e);
        });


        window.addEventListener('editor-load-snapshot', (e: EditorEvent<D>) => {
            e.stopPropagation();
            this._onLoadSnapshot(e);
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


    hasSameDataAs(value: D): boolean {
        throw new Error(`${this.tagName}: method "hasSameDataAs" is not defined.`);
    }


    reflectDataToControls(data: D): void {
        throw new Error(`${this.tagName}: method "reflectDataToControls" is not defined.`);
    }


    isValid(): boolean {
        return this.isDataValid(this.getData());
    }


    isDataValid(data: D): boolean {
        throw new Error(`${this.tagName}: method "isValid" is not defined.`);
    }


    isStructureValid(data: D): boolean {
        throw new Error(`${this.tagName}: method "isStructureValid" is not defined.`);
    }


    private _onSavingSnapshot(e: EditorEvent<D>) {
        this._fireSnapshotDataEvent();
    }


    private _onLoadSnapshot(e: EditorEvent<D>) {
        if (e.detail.data !== null) {
            this.setData(e.detail.data);
        }
    }


    // Events
    protected _fireReadyEvent() {
        const data = this.getData();
        const event = new ControllerEvent('controller-ready', this, data, this.isDataValid(data));

        this.dispatchEvent(event);
    }


    protected _fireDataUpdateEvent() {
        const data = this.getData();
        const event = new ControllerEvent('controller-data-update', this, data, this.isDataValid(data));

        this.dispatchEvent(event);
    }


    protected _fireSnapshotDataEvent() {
        const data = this.getData();
        const event = new ControllerEvent('controller-create-snapshot', this, data, this.isDataValid(data));

        this.dispatchEvent(event);
    }
}