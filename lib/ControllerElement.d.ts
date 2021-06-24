import { LitElement } from 'lit';
import type { IData } from "./IData.js";
export declare abstract class ControllerElement<D extends IData> extends LitElement {
    protected _data: D;
    private _sceneReadyState;
    private _controllerReadyState;
    constructor(defaultData: D);
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    private _startup;
    startup(): Promise<void>;
    isReady(): boolean;
    getData(): D;
    setData(data: D): void;
    hasSameDataAs(value: D): boolean;
    reflectDataToControls(data: D): void;
    isValid(): boolean;
    isDataValid(data: D): boolean;
    isStructureValid(data: D): boolean;
    private _onSceneReadyHandle;
    private _onSavingSnapshotHandle;
    private _onLoadSnapshothandle;
    protected _fireReadyEvent(): void;
    protected _fireDataUpdateEvent(): void;
    protected _fireSnapshotDataEvent(): void;
}
