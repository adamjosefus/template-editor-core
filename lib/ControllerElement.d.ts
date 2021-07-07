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
    abstract startup(): Promise<void>;
    isReady(): boolean;
    getData(): D;
    setData(data: D): void;
    abstract hasSameDataAs(value: D): boolean;
    abstract reflectDataToControls(data: D): void;
    isValid(): boolean;
    abstract isDataValid(data: D): boolean;
    abstract isStructureValid(data: D): boolean;
    private _onSceneReadyHandle;
    private _onControllerRequestHandle;
    protected _fireReadyEvent(): void;
    protected _fireDataUpdateEvent(): void;
    protected _fireResponseEvent(): void;
}
