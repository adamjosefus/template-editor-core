import { LitElement } from 'lit';
import type { IData } from "./IData.js";
export declare abstract class ControllerElement<D extends IData> extends LitElement {
    data: D;
    constructor(defaultData: D);
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    private _isSceneReady;
    private _isControllerReady;
    isReady(): boolean;
    init(): Promise<void>;
    private _startup;
    startup(): Promise<void>;
    isValid(data: D): boolean;
    isValidStructure(data: D): boolean;
    private _onSnapshotDataRequest;
    private _onSnapshotData;
    private _fireEvent;
    protected _fireReadyEvent(): void;
    protected _fireDataUpdateEvent(): void;
    protected _fireSnapshotDataEvent(): void;
}
