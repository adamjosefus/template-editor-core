import { LitElement } from 'lit';
import { ITemplateData } from "./ITemplateData";
export declare abstract class TemplateController<DATA extends ITemplateData> extends LitElement {
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
