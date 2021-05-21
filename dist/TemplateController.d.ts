import { LitElement } from "lit-element";
import { ITemplateData as IData } from "./index.js";
export declare abstract class TemplateController<DATA extends IData> extends LitElement {
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
    fireDataUpdateEvent(): void;
}
