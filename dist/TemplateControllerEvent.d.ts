import { ITemplateData } from "./ITemplateData.js";
declare const enum EVENT_TYPE {
    READY = "templateEditor-controller-ready",
    DATA_UPDATE = "templateEditor-controller-dataUpdate"
}
export declare class TemplateControllerEvent<CONTROLLER_DATA extends ITemplateData> extends CustomEvent<{
    data: CONTROLLER_DATA;
    valid: boolean;
}> {
    static READY: EVENT_TYPE;
    static DATA_UPDATE: EVENT_TYPE;
    constructor(typeArg: EVENT_TYPE, data: CONTROLLER_DATA, valid: boolean);
}
export {};
