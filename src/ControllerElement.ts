import { LitElement } from 'lit';
import { ControllerEvent } from './ControllerEvent.js';
import { SceneEvent } from './SceneEvent.js';
import { EditorEvent } from './EditorEvent.js';
import type { IData } from "./IData.js";


export abstract class ControllerElement<D extends IData> extends LitElement {

    protected _data: D;
    private _sceneReadyState: boolean = false;
    private _controllerReadyState: boolean = false;


    constructor(defaultData: D) {
        super();

        this._data = defaultData;

        this._startup();
    }


    // Lit
    connectedCallback() {
        super.connectedCallback();

        window.addEventListener('scene-ready', this._onSceneReadyHandle.bind(this), { once: true });
        window.addEventListener('editor-saving-snapshot', this._onSavingSnapshotHandle.bind(this), false);
        window.addEventListener('editor-load-snapshot', this._onLoadSnapshothandle.bind(this), false);
    }


    disconnectedCallback() {
        super.disconnectedCallback();

        window.removeEventListener('editor-saving-snapshot', this._onSavingSnapshotHandle);
        window.removeEventListener('editor-load-snapshot', this._onLoadSnapshothandle);
    }


    firstUpdated() {
    }


    // Life Cycle
    private async _startup(): Promise<void> {
        await this.startup();

        this._controllerReadyState = true;
        this._fireReadyEvent();
    }


    async startup(): Promise<void> {
        throw new Error(`${this.tagName}: method "startup" is not defined.`);
    }


    // Methods
    isReady(): boolean {
        return this._controllerReadyState;
    }


    // Data
    getData(): D {
        return this._data;
    }


    setData(data: D): void {
        if (this.isStructureValid(data)) {
            this._data = { ...data };

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


    // Handles
    private _onSceneReadyHandle(e: SceneEvent<D>) {
        e.stopPropagation();

        this._sceneReadyState = true;

        if (this._controllerReadyState && this._sceneReadyState) {
            this._fireDataUpdateEvent();
        }
    }


    private _onSavingSnapshotHandle(e: EditorEvent<D>) {
        e.stopPropagation();

        this._fireSnapshotDataEvent();
    }


    private _onLoadSnapshothandle(e: EditorEvent<D>) {
        e.stopPropagation();

        if (e.detail.data !== null) {
            this.setData(e.detail.data);
        }
    }


    // Events
    protected _fireReadyEvent() {
        const data = this.getData();
        const event = new ControllerEvent('controller-ready', data, this.isDataValid(data));

        this.dispatchEvent(event);
    }


    protected _fireDataUpdateEvent() {
        const data = this.getData();
        const event = new ControllerEvent('controller-data-update', data, this.isDataValid(data));

        this.dispatchEvent(event);
    }


    protected _fireSnapshotDataEvent() {
        const data = this.getData();
        const event = new ControllerEvent('controller-create-snapshot', data, this.isDataValid(data));

        this.dispatchEvent(event);
    }
}