import { LitElement } from 'lit';
import type { IData } from "./IData.js";
export declare abstract class ControllerElement<DATA extends IData> extends LitElement {
    readonly data: DATA;
    constructor(defaultData: DATA);
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    private _isSceneReady;
    private _isControllerReady;
    isReady(): boolean;
    init(): Promise<void>;
    private _startup;
    startup(): Promise<void>;
    isValid(data: DATA): boolean;
    private _fireEvent;
    private _fireReadyEvent;
    private _fireDataUpdateEvent;
    private _onEditorGetLinkRequest;
}
