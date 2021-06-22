import { html, css, LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js'
import { ControllerEvent, ControllerEventType } from './ControllerEvent.js';
import { SceneEvent } from './SceneEvent.js';
import type { IData } from "./IData.js";
import { EditorEvent } from './EditorEvent.js';


export abstract class ControllerElement<DATA extends IData> extends LitElement {

    readonly data: DATA;

    constructor(defaultData: DATA) {
        super();

        // Data
        this.data = defaultData;
    }


    connectedCallback() {
        super.connectedCallback();

        window.addEventListener(SceneEvent.Ready, (e: Event) => {
            const event = e as SceneEvent<DATA>;
            this._isSceneReady = true;

            if (this._isControllerReady && this._isSceneReady) {
                this._fireDataUpdateEvent();
            }
        }, { once: true });


        window.addEventListener(EditorEvent.SnapshotDataRequest, (e: Event) => {
            const evnt = e as EditorEvent;
            this._onSnapshotDataRequest(evnt);
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


    isValid(data: DATA): boolean {
        throw new Error(`${this.tagName}: method isValid is not defined.`);
    }


    isSame(data: DATA): boolean {
        throw new Error(`${this.tagName}: method isValid is not defined.`);
    }


    private _onSnapshotDataRequest(e: EditorEvent) {
        this._fireSnapshotDataEvent();
    }

    // Events
    private _fireEvent(event: ControllerEvent<DATA>): void {
        this.dispatchEvent(event);
        window.dispatchEvent(event);
    }

    private _createEvent(typeArg: ControllerEventType): ControllerEvent<DATA> {
        const valid = this.isValid(this.data);
        // const changed = 

        // this.

        return new ControllerEvent(typeArg, this.data, valid, cahnged);
    }


    protected _fireReadyEvent() {
        const event = this._createEvent(ControllerEvent.Ready);
        this._fireEvent(event);
    }


    protected _fireDataUpdateEvent() {
        const event = this._createEvent(ControllerEvent.DataUpdate);
        this._fireEvent(event);
    }


    protected _fireSnapshotDataEvent() {
        const event = this._createEvent(ControllerEvent.SnapshotData);
        this._fireEvent(event);
    }
}