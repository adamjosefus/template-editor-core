import { CustomElement } from "../CustomElement.js";
import {
    ITemplateData as IData,
    TemplateControllerEvent as ControllerEvent,
    TemplateSceneEvent as SceneEvent
} from "./index.js";


export abstract class TemplateController<DATA extends IData> extends CustomElement {

    readonly data: DATA;

    constructor(defaultData: DATA) {
        super();
        
        // Data
        this.data = defaultData;

        // Init
        window.addEventListener(SceneEvent.READY, (e: Event) => {
            const event = e as SceneEvent<DATA>;
            this._isSceneReady = true;

            if (this._isControllerReady && this._isSceneReady) {
                this.fireDataUpdateEvent();
            }
        }, { once: true });


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


    // Events
    private _fireEvent(event: ControllerEvent<DATA>): void {
        this.dispatchEvent(event);
        window.dispatchEvent(event);
    }


    private _fireReadyEvent() {
        const event = new ControllerEvent(ControllerEvent.READY, this.data, this.isValid(this.data))
        this._fireEvent(event);
    }


    fireDataUpdateEvent() {
        const event = new ControllerEvent(ControllerEvent.DATA_UPDATE, this.data, this.isValid(this.data))
        this._fireEvent(event);
    }


    // fireExportRequest() {
    //     const event = new TemplateControllerEvent(TemplateControllerEvent.EXPORT_REQUEST, this.data, this.isValid(this.data))
    //     this._fireEvent(event);
    // }

}



// const enum EVENT_TYPE {
//     READY = 'templateEditor-controller-ready',
//     DATA_UPDATE = 'templateEditor-controller-dataUpdate',
//     // EXPORT_REQUEST = 'templateEditor-controller-exportRequest', 
// }


// export class TemplateControllerEvent<CONTROLLER_DATA extends ITemplateData> extends CustomEvent<{
//     data: CONTROLLER_DATA,
//     valid: boolean,
// }> {

//     static READY = EVENT_TYPE.READY;
//     static DATA_UPDATE = EVENT_TYPE.DATA_UPDATE;
//     // static EXPORT_REQUEST = EVENT_TYPE.EXPORT_REQUEST;

//     constructor(typeArg: EVENT_TYPE, data: CONTROLLER_DATA, valid: boolean ) {
//         super(typeArg, {
//             detail: {
//                 data,
//                 valid,
//             }
//         })
//     }
// }