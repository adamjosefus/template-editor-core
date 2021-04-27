import { CustomElement } from "../CustomElement.js";
import { TemplateControllerEvent as ControllerEvent, TemplateSceneEvent as SceneEvent } from "./index.js";
export class TemplateController extends CustomElement {
    constructor(defaultData) {
        super();
        this._isSceneReady = false;
        this._isControllerReady = false;
        // Data
        this.data = defaultData;
        // Init
        window.addEventListener(SceneEvent.READY, (e) => {
            const event = e;
            this._isSceneReady = true;
            if (this._isControllerReady && this._isSceneReady) {
                this.fireDataUpdateEvent();
            }
        }, { once: true });
        this.init();
    }
    isReady() {
        return this._isControllerReady;
    }
    async init() {
        await this._startup();
    }
    async _startup() {
        await this.startup();
        this._isControllerReady = true;
        this._fireReadyEvent();
    }
    async startup() {
        throw new Error(`${this.tagName}: method startup is not defined.`);
    }
    isValid(data) {
        throw new Error(`${this.tagName}: method isValid is not defined.`);
    }
    // Events
    _fireEvent(event) {
        this.dispatchEvent(event);
        window.dispatchEvent(event);
    }
    _fireReadyEvent() {
        const event = new ControllerEvent(ControllerEvent.READY, this.data, this.isValid(this.data));
        this._fireEvent(event);
    }
    fireDataUpdateEvent() {
        const event = new ControllerEvent(ControllerEvent.DATA_UPDATE, this.data, this.isValid(this.data));
        this._fireEvent(event);
    }
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
