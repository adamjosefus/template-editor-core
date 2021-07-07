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
        window.addEventListener('editor-controller-request', this._onControllerRequestHandle.bind(this), false);
    }


    disconnectedCallback() {
        super.disconnectedCallback();

        window.removeEventListener('editor-controller-request', this._onControllerRequestHandle);
    }


    firstUpdated() {
    }


    // Life Cycle
    private async _startup(): Promise<void> {
        await this.startup();

        this._controllerReadyState = true;
        this._fireReadyEvent();
    }


    abstract startup(): Promise<void>;


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


    abstract hasSameDataAs(value: D): boolean;


    abstract reflectDataToControls(data: D): void;


    isValid(): boolean {
        return this.isDataValid(this.getData());
    }


    abstract isDataValid(data: D): boolean;


    abstract isStructureValid(data: D): boolean;


    // Handles
    private _onSceneReadyHandle(e: SceneEvent<D>) {
        e.stopPropagation();

        this._sceneReadyState = true;

        if (this._controllerReadyState && this._sceneReadyState) {
            this._fireDataUpdateEvent();
        }
    }


    private _onControllerRequestHandle(e: EditorEvent<D>) {
        e.stopPropagation();

        this._fireResponseEvent();
    }


    // private _onLoadSnapshothandle(e: EditorEvent<D>) {
    //     e.stopPropagation();

    //     if (e.detail.data !== null) {
    //         this.setData(e.detail.data);
    //     }
    // }


    // Events
    protected _fireReadyEvent() {
        const data = this.getData();
        const valid = this.isDataValid(data);

        const event = new ControllerEvent('controller-ready', this, valid);
        this.dispatchEvent(event);
    }


    protected _fireDataUpdateEvent() {
        const data = this.getData();
        const valid = this.isDataValid(data);

        const event = new ControllerEvent('controller-data-update', this, valid);
        this.dispatchEvent(event);
    }


    protected _fireResponseEvent() {
        const data = this.getData();
        const valid = this.isDataValid(data);

        const event = new ControllerEvent('controller-response', this, valid);
        this.dispatchEvent(event);
    }
}